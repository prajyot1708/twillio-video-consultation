import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailConfig } from 'src/config/email.config';
import { emailMessage } from '../message';
@Injectable()
export class EmailService {
  private transporter;
  constructor(private configService: ConfigService) {
    const emailConfig = configService.get<EmailConfig>('email');
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
    });
  }

  async sendEmail(to: String, subject: string, body: string) {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: to,
        subject: subject,
        html: body,
      };
      await this.transporter.sendMail(mailOptions);
      return { message: emailMessage.emailSent, status: 'success' };
    } catch (e) {
      return { message: emailMessage.emailFailed, status: 'failure' };
    }
  }
}
