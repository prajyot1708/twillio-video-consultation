import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import twillioConfig from './config/twillio.config';
import databaseConfig, { DatabaseConfig } from './config/db.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { TwillioModule } from './modules/twillio/twillio.module';
import emailConfig from './config/email.config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, twillioConfig, emailConfig],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database');
        return {
          uri: dbConfig.uri,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    TwillioModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
