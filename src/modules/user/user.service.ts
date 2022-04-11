import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.schema';
import { Model } from 'mongoose';
import { Role } from 'src/shared/enum/roles.enum';
import { VerifyLoginDTO } from './dto/verify-login.dto';
import * as bcrypt from 'bcrypt';
import { UserMapper } from './mapper';
import { EmailService } from 'src/shared/service/email.service';
const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
    private readonly _emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = this.generateRandomString(10);
    const userModel = new this._userModel({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      role: createUserDto.role,
      meetingId:
        createUserDto.role === Role.PROVIDER
          ? this.generateRandomString(10)
          : null,
      email: createUserDto.email,
      password: await bcrypt.hash(password, saltOrRounds),
      mob: createUserDto.mob,
    });
    const user = await userModel.save();
    this._emailService.sendEmail(
      createUserDto.email,
      `TeleMed2U : Registration password`,
      `Please find the password which you can use for login into TeleMed2U: ${password}`,
    );
    return UserMapper.toUserDTO(user);
  }

  generateRandomString(length) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  async findAll() {
    const result = await this._userModel.find();
    return result.map(UserMapper.toUserListDTO);
  }

  async verifyLogin(query: VerifyLoginDTO) {
    const result = await this._userModel.findOne({
      email: query.email,
      active: true,
    });
    const isMatch = await bcrypt.compare(query.password, result.password);
    if (isMatch) {
      return UserMapper.toUserDTO(result);
    } else {
      return null;
    }
  }
}
