import { IsNumber, IsNumberString } from 'class-validator';

export class GetUserParamDto {
  @IsNumberString()
  id: number;
}
