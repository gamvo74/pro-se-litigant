import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DocumentsService {
  private s3: AWS.S3;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
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
      const existingDocsCount = await this.prisma.document.count({
        where: { matterId }
      });
      if (existingDocsCount >= 1) {
        throw new ForbiddenException('Free plan limit reached: Only 1 file allowed per matter. Upgrade to Premium for unlimited uploads.');
      }
    }

    // 3. Proceed with Upload
    const key = `users/${userId}/matters/${matterId}/${Date.now()}-${file.originalname}`;
    
    // S3 Logic would go here (already scaffolded in original file)

    return this.prisma.document.create({
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
  }

  async findAll(matterId: string) {
    return this.prisma.document.findMany({ where: { matterId } });
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
