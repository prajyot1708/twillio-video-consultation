import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './service/email.service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports:[EmailService]
})
export class SharedModule {}
