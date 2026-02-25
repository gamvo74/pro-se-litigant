import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MattersService } from './matters.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('matters')
@UseGuards(JwtAuthGuard)
export class MattersController {
  constructor(private readonly mattersService: MattersService) {}

  @Post()
  create(@Request() req, @Body() createMatterDto: { title: string; description?: string }) {
    return this.mattersService.create(req.user.id, createMatterDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.mattersService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.mattersService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateMatterDto: any) {
    return this.mattersService.update(req.user.id, id, updateMatterDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.mattersService.remove(req.user.id, id);
  }
}
