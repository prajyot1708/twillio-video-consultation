import { IsNotEmpty } from 'class-validator';

export class GenerateTokenDTO {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  meetingId: string;
}
