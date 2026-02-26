import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MattersModule } from './matters/matters.module';
import { AiModule } from './ai/ai.module';
import { DocumentsModule } from './documents/documents.module';
import { MockTrialModule } from './mock-trial/mock-trial.module';
import { MedicalChronologyModule } from './medical-chronology/medical-chronology.module';
import { PrismaService } from './prisma.service';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MattersModule,
    AiModule,
    DocumentsModule,
    MockTrialModule,
    MedicalChronologyModule,
    HttpModule, // Add HttpModule here
  ],
  providers: [PrismaService],
})
export class AppModule {}