import { ObjectId } from 'mongoose';

export class UserDTO {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  role: string;
  meetingId: string;
  email: string;
}
