import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const twilio = require('twilio');
import { throwError } from 'rxjs';
import { TwillioConfig } from 'src/config/twillio.config';
import { GenerateTokenDTO } from './dto/generate-token.dto';

@Injectable()
export class TwillioService implements OnModuleInit {
  private readonly TWILLO_ACCOUNT_SID: string;
  private readonly TWILLO_AUTH_TOKEN: string;
  private readonly TWILLO_API_KEY: string;
  private readonly TWILLO_CHAT_SERVICE_ID: string;
  private readonly TWILLO_API_SECRET: string;
  private TwilloClient: any;

  constructor(private configService: ConfigService) {
    const twillioConfig = configService.get<TwillioConfig>('twillio');
    this.TWILLO_ACCOUNT_SID = twillioConfig.accountSid;
    this.TWILLO_AUTH_TOKEN = twillioConfig.authToken;
    this.TWILLO_CHAT_SERVICE_ID = twillioConfig.chatServiceId;
    this.TWILLO_API_KEY = twillioConfig.apiKey;
    this.TWILLO_API_SECRET = twillioConfig.apiSecret;
  }

  async onModuleInit() {
    this.TwilloClient = twilio(this.TWILLO_ACCOUNT_SID, this.TWILLO_AUTH_TOKEN);
  }

  //Generate Grant Token for Video and Chat Consultation
  async generateGrantToken(query: GenerateTokenDTO): Promise<any> {
    try {
      const userName = query.userName;
      const roomname = query.meetingId;
      const AccessToken = require('twilio').jwt.AccessToken;
      const VideoGrant = AccessToken.VideoGrant;
      const user_identity = userName;
      const ROOM_TYPE = 'group';
      const client = this.TwilloClient;
      let room;

      try {
        // See if a room already exists
        room = await client.video.rooms(roomname).fetch();
      } catch (e) {
        try {
          // If room doesn't exist, create it
          room = await client.video.rooms.create({
            uniqueName: roomname,
            type: ROOM_TYPE,
          });
        } catch (e) {
          const error = {
            message: 'error creating room',
            explanation: 'Something went wrong when creating a room.',
          };
          return error;
        }
      }

      const videoGrant = new VideoGrant({ room: roomname });
      const token = new AccessToken(
        this.TWILLO_ACCOUNT_SID,
        this.TWILLO_API_KEY,
        this.TWILLO_API_SECRET,
        { identity: user_identity },
      );
      token.addGrant(videoGrant);
      return { token: token.toJwt(), room: room }; // Serialize the token to a JWT string
    } catch (e) {
      console.log('e', e);
      return e;
    }
  }
}
