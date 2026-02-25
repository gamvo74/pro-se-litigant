import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  chat(
    @Request() req,
    @Body() body: { matterId: string; sessionId?: string; message: string },
  ) {
    return this.aiService.chat(req.user.id, body.matterId, body.sessionId, body.message);
  }

  @Post('research')
  research(@Body() body: { query: string; jurisdiction: string }) {
    return this.aiService.research(body.query, body.jurisdiction);
  }
}
