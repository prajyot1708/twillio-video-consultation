import { UserListReplyDTO } from '../dto/list-user.dto';
import { UserDTO } from '../dto/user.dto';
import { User } from '../entities/user.schema';

export class UserMapper {
  static toUserListDTO(entity: User): UserListReplyDTO {
    const dto = new UserListReplyDTO();
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.email = entity.email;
    dto.meetingId = entity.meetingId;
    dto.role = entity.role;
    dto.mob = entity.mob;
    return dto;
  }

  static toUserDTO(entity): UserDTO {
    const dto = new UserDTO();
    dto._id = entity._id;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.email = entity.email;
    dto.meetingId = entity.meetingId;
    dto.role = entity.role;
    return dto;
  }
}
