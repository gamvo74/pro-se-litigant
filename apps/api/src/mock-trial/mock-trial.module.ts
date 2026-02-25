import { Module } from '@nestjs/common';
import { MockTrialService } from './mock-trial.service';
import { MockTrialController } from './mock-trial.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MockTrialController],
  providers: [MockTrialService, PrismaService],
})
export class MockTrialModule {}
