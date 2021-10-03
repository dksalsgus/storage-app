import {
  Body,
  Controller,
  Post,
  Get,
  Render,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { MemberJoinDto } from './dto/memberjoin.dto';
import { MemberUpdateDto } from './dto/memberupdate.dto';
import { Member } from './member.entity';
import { MemberService } from './member.service';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async postMemberJoin(@Body() memberJoinDto: MemberJoinDto): Promise<Member> {
    const member = await this.memberService.memberJoin(memberJoinDto);
    return member;
  }

  @Get('member')
  @Render('member/join.ejs')
  getMemberJoin(): void {}

  @Get('member/:member_no')
  async findMember(@Param('member_no') member_no: number): Promise<Member> {
    const member = await this.memberService.memberFind(member_no);
    return member;
  }

  @Delete('member/:member_no')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMember(@Param('member_no') member_no: number): Promise<void> {
    await this.memberService.memberDelete(member_no);
  }

  @Patch('member/:member_no')
  async updateMember(
    @Param('member_no') member_no: number,
    @Body() memberUpdateDto: MemberUpdateDto,
  ): Promise<Member> {
    const updateMember = await this.memberService.memberUpdate(
      member_no,
      memberUpdateDto,
    );
    return updateMember;
  }

  @Get('members')
  async findAllMember(): Promise<Member[]> {
    const memberList = await this.memberService.memberFindAll();
    return memberList;
  }
}
