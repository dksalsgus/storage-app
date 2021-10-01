import { Injectable } from '@nestjs/common';
import { Member } from './member.entity';
import { MemberRepository } from './member.repository';
import { MemberJoinDto } from './dto/memberjoin.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async memberJoin(memberJoinDto: MemberJoinDto): Promise<Member> {
    const { member_id, member_name, member_pw, member_email } = memberJoinDto;

    const member = new Member();
    member.member_id = member_id;
    member.member_pw = member_pw;
    member.member_email = member_email;
    member.member_name = member_name;

    const joinMember = await this.memberRepository.create(member);

    const saveMember = this.memberRepository.save(joinMember);

    return saveMember;
  }
}
