import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MockTrialService } from './mock-trial.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { SubscriptionGuard } from '../auth/subscription.guard';

@Controller('mock-trial')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
export class MockTrialController {
  constructor(private readonly mockTrialService: MockTrialService) {}

  @Post(':matterId')
  create(@Param('matterId') matterId: string, @Body() body: { title: string }) {
    return this.mockTrialService.create(matterId, body.title);
  }

  @Get(':matterId')
  findAll(@Param('matterId') matterId: string) {
    return this.mockTrialService.findAll(matterId);
  }
}
