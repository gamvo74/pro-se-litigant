import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PatController } from './pat.controller';
import { PatService } from './pat.service';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, PatService, PrismaService, JwtStrategy],
  controllers: [AuthController, PatController],
  exports: [PatService],
})
export class AuthModule {}
