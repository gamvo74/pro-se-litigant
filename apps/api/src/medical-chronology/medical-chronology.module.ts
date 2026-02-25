import { Module } from '@nestjs/common';
import { MedicalChronologyService } from './medical-chronology.service';
import { MedicalChronologyController } from './medical-chronology.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MedicalChronologyController],
  providers: [MedicalChronologyService, PrismaService],
})
export class MedicalChronologyModule {}
