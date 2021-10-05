import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from '../member/member.service';
import { AuthLoginDto } from './dto/login.dto';
import { Member } from '../member/member.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  /**
   * 로그인 정보로 유효성 검사
   * @param authLoginDto 로그인 정보 id pw
   * @returns Auth Member
   */
  async validateMember(authLoginDto: AuthLoginDto): Promise<Member> {
    const { member_id, member_pw } = authLoginDto;
    const member = await this.memberService.memberFindById(member_id);

    if (!(await bcrypt.compare(member_pw, member.member_pw))) {
      throw new UnauthorizedException();
    }
    return member;
  }

  /**
   * 유효성 검사후 JWT sign
   * @param authLoginDto 로그인 정보
   * @returns Access Token
   */
  async login(authLoginDto: AuthLoginDto) {
    const member = await this.validateMember(authLoginDto);

    const payload = {
      userId: member.member_id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
