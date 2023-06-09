import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { USER_NOT_ACTIVE } from '../../../errors';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const isAuthenticated = await super.canActivate(context);

    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }

    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const { isActive } = gqlReq.user;

    if (!isActive) {
      throw new UnauthorizedException(USER_NOT_ACTIVE);
    }

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;

    if (gqlReq) {
      const { variables } = ctx.getArgs();
      gqlReq.body = variables;
      return gqlReq;
    }

    return context.switchToHttp().getRequest();
  }
}
