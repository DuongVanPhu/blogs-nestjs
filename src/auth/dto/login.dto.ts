import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  readonly password: string;
}
