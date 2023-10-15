import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(15)
  password: string;

  @ApiProperty({ default: 'test@gamil.com' })
  @IsEmail()
  @IsOptional()
  email: string;
}
