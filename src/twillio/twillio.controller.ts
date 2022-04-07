import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { GenerateTokenDTO } from './dto/generate-token.dto';
import { TwillioService } from './twillio.service';

@Controller({
  version: '1',
})
export class TwillioController {
  constructor(private readonly twillioService: TwillioService) {}

  @Get('/generate-twillio-token')
  generateToken(@Query() query: GenerateTokenDTO) {
    return this.twillioService.generateGrantToken(query);
  }
}
