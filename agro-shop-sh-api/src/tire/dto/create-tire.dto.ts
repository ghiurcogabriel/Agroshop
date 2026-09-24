import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTireDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  brand: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  width: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  height: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  diameter: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @MaxLength(1500)
  @IsString()
  description: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  addedById?: string;

  // Backward-compatible fields for older payloads.
  @IsOptional()
  addedBy?: unknown;

  @IsOptional()
  category?: unknown;
}
