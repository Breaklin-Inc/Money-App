import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean, 'isPublic'>(
      'isPublic',
      [context.getClass(), context.getHandler],
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException({
          message: 'Access token expired',
          errorCode: 'TOKEN_EXPIRED',
        });
      } else {
        throw new UnauthorizedException({
          message: 'Invalid Token',
          errorCode: 'TOKEN_INVALID',
        });
      }
    }

    return user;
  }
}
