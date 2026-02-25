import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MockTrialService {
  constructor(private prisma: PrismaService) {}

  async create(matterId: string, title: string) {
    return this.prisma.mockTrial.create({
      data: { matterId, title },
    });
  }

  async findAll(matterId: string) {
    return this.prisma.mockTrial.findMany({ where: { matterId } });
  }
}
