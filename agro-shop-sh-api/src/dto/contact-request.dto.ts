import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class ContactRequestDto {
  @IsString()
  @Length(2, 120)
  name: string;

  @IsString()
  @Length(7, 30)
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(3, 120)
  subject?: string;

  @IsOptional()
  @IsString()
  @Length(5, 1500)
  message?: string;
}
