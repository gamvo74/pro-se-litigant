import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaService } from '../prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

@Module({
  imports: [ConfigModule, HttpModule], // Import ConfigModule and HttpModule
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService],
  exports: [DocumentsService],
})
export class DocumentsModule {}