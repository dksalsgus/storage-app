import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from 'src/member/member.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
