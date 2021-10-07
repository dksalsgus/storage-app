import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from 'src/member/member.entity';

export const User = createParamDecorator(
  (_data, ctx: ExecutionContext): Member => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
