import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post(':matterId/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Request() req,
    @Param('matterId') matterId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentsService.upload(req.user.id, matterId, file);
  }

  @Get(':matterId')
  findAll(@Param('matterId') matterId: string) {
    return this.documentsService.findAll(matterId);
  }
}
