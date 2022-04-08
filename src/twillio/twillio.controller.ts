import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GENERATE_TWILLIO_TOKEN } from 'src/constants/url';
import { GenerateTokenDTO } from './dto/generate-token.dto';
import { TwillioService } from './twillio.service';

@ApiTags('Twillio')
@Controller({
  version: '1',
})
export class TwillioController {
  constructor(private readonly twillioService: TwillioService) {}

  /** This endpoint generates twillio token required for video consultation*/
  @Get(GENERATE_TWILLIO_TOKEN)
  async generateToken(@Query() query: GenerateTokenDTO) {
    return await this.twillioService.generateGrantToken(query);
  }
}
