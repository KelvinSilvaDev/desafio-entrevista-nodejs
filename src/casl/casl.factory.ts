import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';



import { User } from '../users/user.entity';
import { UserActionsEnum, UserRolesEnum } from 'src/users/dto/user.dto';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[UserActionsEnum, Subjects]>;

@Injectable()
export class CaslFactory {
  createForUser(user: User) {

    const { can, build } = new AbilityBuilder<
      Ability<[UserActionsEnum, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.some(({ role }) => role === UserRolesEnum.SUDO)) {
      can(UserActionsEnum.Manage, 'all'); 
    } else {
      can(UserActionsEnum.Read, 'all'); 
    }

    can(UserActionsEnum.Update, User, { username: user.username }); // update own user

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
