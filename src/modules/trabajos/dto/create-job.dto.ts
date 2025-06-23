import { IsInt, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobDto {
  @Type(() => Number)
  @IsInt()
  employerId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}