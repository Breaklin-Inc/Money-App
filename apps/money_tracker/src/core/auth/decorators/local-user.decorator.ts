import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IUser } from '@Breaklin-Inc/core';

export const LocalUser = createParamDecorator(
  (_, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest<Request & { user: IUser }>();
    return request.user;
  },
);
