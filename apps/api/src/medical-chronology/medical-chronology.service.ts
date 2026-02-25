import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MedicalChronologyService {
  constructor(private prisma: PrismaService) {}

  async create(matterId: string, title: string) {
    return this.prisma.medicalChronology.create({
      data: { matterId, title },
    });
  }

  async findAll(matterId: string) {
    return this.prisma.medicalChronology.findMany({ where: { matterId } });
  }
}
