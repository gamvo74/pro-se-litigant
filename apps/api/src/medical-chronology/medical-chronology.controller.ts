import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MedicalChronologyService } from './medical-chronology.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { SubscriptionGuard } from '../auth/subscription.guard';

@Controller('medical-chronology')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
export class MedicalChronologyController {
  constructor(private readonly medicalChronologyService: MedicalChronologyService) {}

  @Post(':matterId')
  create(@Param('matterId') matterId: string, @Body() body: { title: string }) {
    return this.medicalChronologyService.create(matterId, body.title);
  }

  @Get(':matterId')
  findAll(@Param('matterId') matterId: string) {
    return this.medicalChronologyService.findAll(matterId);
  }
}
