import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async chat(userId: string, matterId: string, sessionId: string | undefined, message: string) {
    let session;
    if (sessionId) {
      session = await this.prisma.chatSession.findUnique({ where: { id: sessionId } });
    }

    if (!session) {
      session = await this.prisma.chatSession.create({
        data: {
          matterId,
          title: message.substring(0, 30),
        },
      });
    }

    // Save user message
    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'user',
        content: message,
      },
    });

    // Get previous messages for context
    const history = await this.prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: 'asc' },
      take: 10,
    });

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'You are an AI legal assistant specialized in helping pro se litigants. Provide accurate legal research and drafting help. Always include a disclaimer.' },
        ...history.map(m => ({ role: m.role as any, content: m.content })),
      ],
    });

    const reply = completion.choices[0].message.content;

    // Save assistant message
    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: reply || '',
      },
    });

    return {
      sessionId: session.id,
      reply,
    };
  }

  async research(query: string, jurisdiction: string) {
    // Stub for Advanced Legal Research
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: `Perform legal research for the query in ${jurisdiction}. Provide case citations and precedential weight.` },
        { role: 'user', content: query },
      ],
    });

    return {
      results: completion.choices[0].message.content,
    };
  }
}
