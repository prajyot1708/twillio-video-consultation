import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyLoginDTO } from './dto/verify-login.dto';
import { Response } from 'express'


@Controller({
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('user')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('user/verify-login')
  async verifyLogin(@Query() query: VerifyLoginDTO, @Res() res: Response) {
    const result = await this.userService.verifyLogin(query);
    if (result) {
      res.status(HttpStatus.OK).send(result);
    } else {
      res.status(HttpStatus.FORBIDDEN);
    }
  }
}
