import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/shared/enum/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  mob: string;

  @IsNotEmpty()
  password: string;
}
