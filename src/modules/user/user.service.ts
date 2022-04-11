import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.schema';
import { Model } from 'mongoose';
import { Role } from 'src/shared/enum/roles.enum';
import { VerifyLoginDTO } from './dto/verify-login.dto';
import * as bcrypt from 'bcrypt';
import { UserMapper } from './mapper';
const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userModel = new this._userModel({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      role: createUserDto.role,
      meetingId:
        createUserDto.role === Role.PROVIDER ? this.createMeetingId(10) : null,
      email: createUserDto.email,
      password:
        createUserDto.role === Role.PROVIDER
          ? await bcrypt.hash('Provider@123', saltOrRounds)
          : await bcrypt.hash('Admin@123', saltOrRounds),
      mob: createUserDto.mob,
    });
    return await userModel.save();
  }

  createMeetingId(length) {
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
