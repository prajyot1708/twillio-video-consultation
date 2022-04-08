import { IsNotEmpty } from 'class-validator';

export class VerifyLoginDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
