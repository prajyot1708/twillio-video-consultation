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
import { Response } from 'express';
import {
  EMAIL_ALREADY_EXISTS,
  WRONG_USERNAME_OR_PASSWORD,
} from './constants/message';
import { CREATE_USER, GET_USER_LIST, VERIFY_LOGIN } from 'src/constants/url';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@Controller({
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** This endpoint onboards user into the system*/
  @Post(CREATE_USER)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.create(createUserDto);
      res.status(HttpStatus.OK).send(user);
    } catch (error) {
      res.status(HttpStatus.FORBIDDEN).send({ message: EMAIL_ALREADY_EXISTS });
    }
  }

  /** This endpoint provides users list from the system*/
  @Get(GET_USER_LIST)
  async findAll() {
    return await this.userService.findAll();
  }

  /** This endpoint verify user using username and password*/
  @Get(VERIFY_LOGIN)
  async verifyLogin(@Query() query: VerifyLoginDTO, @Res() res: Response) {
    const result = await this.userService.verifyLogin(query);
    if (result) {
      res.status(HttpStatus.OK).send(result);
    } else {
      console.log('going');
      res
        .status(HttpStatus.FORBIDDEN)
        .send({ message: WRONG_USERNAME_OR_PASSWORD });
    }
  }
}
