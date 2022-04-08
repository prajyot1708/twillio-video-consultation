import { Module } from '@nestjs/common';
import { TwillioService } from './twillio.service';
import { TwillioController } from './twillio.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [ConfigModule],
  controllers: [TwillioController],
  providers: [TwillioService]
})
export class TwillioModule {}
