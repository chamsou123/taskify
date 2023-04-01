import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
