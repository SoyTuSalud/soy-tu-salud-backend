import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  ignore
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { User } from '../schemas/user.schema';
import { UserDto } from './user.dto';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, User, UserDto);
      createMap(
        mapper,
        CreateUserDto,
        User
        //forMember(dest => dest._id, ignore()),
      );
      createMap(mapper, UpdateUserDto, User);
    };
  }
}
