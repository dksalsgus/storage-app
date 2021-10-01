import { Body, Controller, Post, Get, Render } from '@nestjs/common';
import { MemberJoinDto } from './dto/memberjoin.dto';
import { Member } from './member.entity';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async postMemberJoin(@Body() memberJoinDto: MemberJoinDto): Promise<Member> {
    const member = await this.memberService.memberJoin(memberJoinDto);
    return member;
  }

  @Get()
  @Render('member/join.ejs')
  getMemberJoin(): void {}
}
