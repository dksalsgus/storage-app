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

  @Get(':id')
  async findMember(@Param('id') member_no: number): Promise<Member> {
    const member = await this.memberService.memberFind(member_no);
    return member;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMember(@Param('id') member_no: number): Promise<void> {
    await this.memberService.memberDelete(member_no);
  }

  @Patch(':id')
  async updateMember(
    @Param('id') member_no: number,
    @Body() memberUpdateDto: MemberUpdateDto,
  ): Promise<Member> {
    const updateMember = await this.memberService.memberUpdate(
      member_no,
      memberUpdateDto,
    );
    return updateMember;
  }
}
