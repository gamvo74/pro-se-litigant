import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MattersService } from './matters.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateMatterDto } from './dto/matter.dto';

@UseGuards(JwtAuthGuard)
@Controller('matters')
export class MattersController {
  constructor(private mattersService: MattersService) {}

  @Post()
  create(
    @Request() req: any,
    @Body() body: CreateMatterDto,
  ) {
    return this.mattersService.create(
      req.user.sub,
      body.title,
      body.description,
    );
  }

  @Get()
  findAll(@Request() req: any) {
    return this.mattersService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.mattersService.findOne(req.user.sub, id);
  }

  @Delete(':id')
  delete(@Request() req: any, @Param('id') id: string) {
    return this.mattersService.delete(req.user.sub, id);
  }
}