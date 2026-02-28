import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, password: hashed },
    });

    return this.signToken(user.id, user.email);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new UnauthorizedException();

    return this.signToken(user.id, user.email);
  }

  async refreshToken(userId: string, email: string) {
    return this.signToken(userId, email);
  }

  private async signToken(userId: string, email: string) {
    const payload = { sub: userId, email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
