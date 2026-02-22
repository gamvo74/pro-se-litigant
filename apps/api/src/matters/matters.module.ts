import { Module } from '@nestjs/common';
import { MattersService } from './matters.service';
import { MattersController } from './matters.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MattersController],
  providers: [MattersService, PrismaService],
})
export class MattersModule {}