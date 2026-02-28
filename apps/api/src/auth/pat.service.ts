import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PatService {
  constructor(private prisma: PrismaService) {}

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async create(userId: string, name: string, expiresAt?: Date) {
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(token);

    const pat = await this.prisma.personalAccessToken.create({
      data: {
        name,
        tokenHash,
        userId,
        expiresAt: expiresAt ?? null,
      },
    });

    return { ...pat, token };
  }

  async findAll(userId: string) {
    return this.prisma.personalAccessToken.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async revoke(userId: string, id: string) {
    const pat = await this.prisma.personalAccessToken.findFirst({
      where: { id, userId },
    });

    if (!pat) throw new NotFoundException('Personal access token not found');

    return this.prisma.personalAccessToken.delete({ where: { id } });
  }

  async validateToken(token: string) {
    const tokenHash = this.hashToken(token);

    const pat = await this.prisma.personalAccessToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!pat) return null;
    if (pat.expiresAt && pat.expiresAt < new Date()) return null;

    await this.prisma.personalAccessToken.update({
      where: { id: pat.id },
      data: { lastUsedAt: new Date() },
    });

    return { sub: pat.user.id, email: pat.user.email };
  }
}
