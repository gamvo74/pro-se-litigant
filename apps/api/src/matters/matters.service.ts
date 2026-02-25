import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MattersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { title: string; description?: string }) {
    // 1. Check user role
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    const isPremium = user?.role === 'PREMIUM_USER' || user?.role === 'ADMIN';

    // 2. Enforce Free Plan Limit: 1 Matter Only
    if (!isPremium) {
      const existingMattersCount = await this.prisma.matter.count({
        where: { userId }
      });

      if (existingMattersCount >= 1) {
        throw new ForbiddenException('Free plan limit reached: You can only have 1 active matter. Upgrade to Premium for unlimited matters and cases.');
      }
    }

    return this.prisma.matter.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.matter.findMany({
      where: { userId },
      include: {
        _count: {
          select: { documents: true },
        },
      },
    });
  }

  async findOne(userId: string, id: string) {
    const matter = await this.prisma.matter.findFirst({
      where: { id, userId },
      include: {
        documents: true,
        chats: {
          take: 5,
          orderBy: { updatedAt: 'desc' },
        },
      },
    });
    if (!matter) throw new NotFoundException('Matter not found');
    return matter;
  }

  async update(userId: string, id: string, data: { title?: string; description?: string; status?: any }) {
    return this.prisma.matter.updateMany({
      where: { id, userId },
      data,
    });
  }

  async remove(userId: string, id: string) {
    return this.prisma.matter.deleteMany({
      where: { id, userId },
    });
  }
}
