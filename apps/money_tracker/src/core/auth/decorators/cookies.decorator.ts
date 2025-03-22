import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const cookies = ctx.switchToHttp().getRequest<Request>()?.cookies;
    return data ? cookies?.[data] : cookies;
  },
);
