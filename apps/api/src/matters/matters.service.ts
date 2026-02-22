import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MattersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, title: string, description?: string) {
    return this.prisma.matter.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.matter.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const matter = await this.prisma.matter.findUnique({
      where: { id },
    });

    if (!matter || matter.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return matter;
  }

  async delete(userId: string, id: string) {
    const matter = await this.prisma.matter.findUnique({
      where: { id },
    });

    if (!matter || matter.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.matter.delete({
      where: { id },
    });
  }
}