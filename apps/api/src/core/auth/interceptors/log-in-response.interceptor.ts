import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';
import { ILogInReturn } from '../services/types';
import { ILogInBodyRes } from '@Breaklin-Inc/external';
import { User } from '../../user/entities';
import { IUser } from '@Breaklin-Inc/core';

export class LogInResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ILogInReturn & IUser<Date>>,
  ): Observable<ILogInBodyRes> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map(({ accessToken, refreshToken, email, username }) => {
        response.cookie('refresh-token', refreshToken, {
          httpOnly: true,
          secure: true,
        });

        return { accessToken, email, username };
      }),
    );
  }
}
