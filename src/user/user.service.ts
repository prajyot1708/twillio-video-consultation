import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.schema';
import { Model } from 'mongoose';
import { Role } from 'src/shared/enum/roles.enum';
import { VerifyLoginDTO } from './dto/verify-login.dto';

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
      password: createUserDto.password,
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
    return await this._userModel.find();
  }

  async verifyLogin(query: VerifyLoginDTO) {
    const result =await this._userModel.findOne({
      email: query.email,
      password: query.password,
      active: true,
    }).lean();
    return result;
  }
}
