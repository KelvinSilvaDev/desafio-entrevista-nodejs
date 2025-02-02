

import { UserActionsEnum } from 'src/users/dto/user.dto';
import { User } from '../users/user.entity';
import { AppAbility } from './casl.factory';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export class DeleteUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(UserActionsEnum
      .Delete, User);
  }
}
