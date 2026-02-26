import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { PrismaService } from '../prisma.service';
import { ProcessingStatus } from '@prisma/client';
import OpenAI from 'openai'; // Import OpenAI

@Injectable()
export class DocumentsService {
  private s3: AWS.S3;
  private openai: OpenAI; // Declare openai client

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });

    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async upload(userId: string, matterId: string, file: Express.Multer.File) {
    // 1. Fetch User Subscription Status
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { _count: { select: { matters: true } } }
    });

    const isPremium = user?.role === 'PREMIUM_USER' || user?.role === 'ADMIN';

    // 2. Enforce Free Plan Limits
    if (!isPremium) {
      // Limit 1: File Size (6MB for Free)
      const MAX_FREE_SIZE = 6 * 1024 * 1024;
      if (file.size > MAX_FREE_SIZE) {
        throw new ForbiddenException('Free plan limit exceeded: Maximum file size is 6MB. Upgrade to Premium for unlimited size.');
      }

      // Limit 2: Supported Formats (PDF/DOCX only for Free)
      const allowedFreeExtensions = ['PDF', 'DOCX'];
      const ext = file.originalname.split('.').pop()?.toUpperCase() || '';
      if (!allowedFreeExtensions.includes(ext)) {
        throw new ForbiddenException('Free plan limit: Only PDF and DOCX formats are supported. Upgrade to Premium for all media, images, and data formats.');
      }

      // Limit 3: Total Files per Matter (1 file only for Free)
      const existingMattersCount = await this.prisma.matter.count({
        where: { userId }
      });
      if (existingMattersCount >= 1) {
        throw new ForbiddenException('Free plan limit reached: Only 1 matter allowed. Upgrade to Premium for unlimited matters and cases.');
      }
    }

    // 3. Proceed with Upload
    const key = `users/${userId}/matters/${matterId}/${Date.now()}-${file.originalname}`;
    
    // In production, we'd upload to S3 here. 
    // For now, let's assume it's successful and save to DB.
    /*
    await this.s3.putObject({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }).promise();
    */

    const document = await this.prisma.document.create({
      data: {
        name: file.originalname,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        s3Key: key,
        type: this.determineType(file.originalname),
        matterId,
      },
    });

    // If it's a media file, initiate transcription
    if (['MP3', 'MP4', 'WAV', 'WMA', 'WMX', 'FLV', 'M4A'].includes(document.type as any)) {
        // Here you would upload the file to S3 first
        // For now, we'll simulate the S3 upload and then call transcribe
        await this.prisma.document.update({
            where: { id: document.id },
            data: { transcriptionStatus: ProcessingStatus.PROCESSING },
        });

        // Simulate S3 upload and then call actual transcription service
        this.transcribeFile(document.id, file.buffer as Buffer);
    }


    return document;
  }

  async transcribeFile(documentId: string, fileBuffer: Buffer) {
    try {
      // Create a temporary file to pass to OpenAI (Whisper API expects a file)
      const tempFilePath = `/tmp/temp_audio_${documentId}.mp3`; // Or appropriate extension
      // For now, assume it's an MP3. In a real scenario, check mimeType from document.
      require('fs').writeFileSync(tempFilePath, fileBuffer);

      const transcription = await this.openai.audio.transcriptions.create({
        file: require('fs').createReadStream(tempFilePath),
        model: "whisper-1",
        response_format: "verbose_json", // To get timestamps and other details
      });

      // Clean up temporary file
      require('fs').unlinkSync(tempFilePath);

      await this.prisma.document.update({
        where: { id: documentId },
        data: {
          transcriptionText: JSON.stringify(transcription), // Store full verbose JSON
          transcriptionStatus: ProcessingStatus.COMPLETED,
        },
      });
      console.log(`Transcription completed for document ${documentId}`);
    } catch (error) {
      await this.prisma.document.update({
        where: { id: documentId },
        data: { transcriptionStatus: ProcessingStatus.FAILED },
      });
      console.error(`Transcription failed for document ${documentId}:`, error);
    }
  }

  async findAll(matterId: string) {
    return this.prisma.document.findMany({ where: { matterId } });
  }

  async getTranscription(documentId: string) {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
      select: { transcriptionText: true, transcriptionStatus: true },
    });
    return document;
  }

  private determineType(filename: string): any {
    const ext = filename.split('.').pop()?.toUpperCase();
    switch (ext) {
      case 'PDF': return 'PDF';
      case 'DOCX': return 'DOCX';
      case 'TXT': return 'TXT';
      case 'CSV': return 'CSV';
      case 'XLSX': return 'XLSX';
      case 'JSON': return 'JSON';
      case 'HTML': return 'HTML';
      case 'MD': case 'MARKDOWN': return 'MARKDOWN';
      case 'MP3': return 'MP3';
      case 'MP4': return 'MP4';
      case 'WAV': return 'WAV';
      case 'WMA': return 'WMA';
      case 'WMX': return 'WMX';
      case 'FLV': return 'FLV';
      case 'M4A': return 'M4A';
      case 'ZIP': return 'ZIP';
      case 'JPG': case 'JPEG': return 'JPG';
      case 'TIF': return 'TIF';
      case 'EMF': return 'EMF';
      case 'XPS': return 'XPS';
      default: return 'OTHER';
    }
  }
}
