import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateMatterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;
}
