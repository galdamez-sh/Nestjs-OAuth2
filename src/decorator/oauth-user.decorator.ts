import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IOAuthUser {
  provider: string;
  userId: string;
}
export const OAuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
