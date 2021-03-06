import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/shared/enum/roles.enum';
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt')

export type UserDocument = User & Document;

@Schema({ collection: 'user', timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ enum: Role })
  role: Role;

  @Prop({ required: false })
  meetingId: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ maxlength: 200 })
  password: string;
  
  @Prop({ required: true })
  mob: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

    
