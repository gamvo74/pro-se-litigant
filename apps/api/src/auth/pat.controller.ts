import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { PatService } from './pat.service';

@Controller('auth/pat')
@UseGuards(JwtAuthGuard)
export class PatController {
  constructor(private patService: PatService) {}

  @Post()
  create(
    @Request() req: any,
    @Body() body: { name: string; expiresAt?: string },
  ) {
    const expiresAt = body.expiresAt ? new Date(body.expiresAt) : undefined;
    return this.patService.create(req.user.sub, body.name, expiresAt);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.patService.findAll(req.user.sub);
  }

  @Delete(':id')
  revoke(@Request() req: any, @Param('id') id: string) {
    return this.patService.revoke(req.user.sub, id);
  }
}
