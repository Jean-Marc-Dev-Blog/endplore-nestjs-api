import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
