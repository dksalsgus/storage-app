import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Member } from 'src/member/member.entity';
import { MemberRepository } from 'src/member/member.repository';

const fromAuthCookie = function () {
  return function (req: Request) {
    let token = null; // token 초기화
    if (req && req.cookies) {
      token = req.cookies['Authorization'];
    }
    return token;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
  ) {
    super({
      jwtFromRequest: fromAuthCookie(), //ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<Member> {
    const { userId } = payload;
    const member = await this.memberRepository.findOne({ member_id: userId });
    return member;
  }
}
