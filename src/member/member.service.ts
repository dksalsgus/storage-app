import { Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './member.entity';
import { MemberRepository } from './member.repository';
import { MemberJoinDto } from './dto/memberjoin.dto';
import { MemberUpdateDto } from './dto/memberupdate.dto';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async memberJoin(memberJoinDto: MemberJoinDto): Promise<Member> {
    const { member_id, member_name, member_pw, member_email } = memberJoinDto;

    const member = new Member();
    member.member_id = member_id;
    member.member_pw = await bcrypt.hash(member_pw, 10);
    member.member_email = member_email;
    member.member_name = member_name;

    const joinMember = await this.memberRepository.create(member);

    const saveMember = this.memberRepository.save(joinMember);

    return saveMember;
  }

  async memberFind(member_no: number): Promise<Member> {
    const findMember = await this.memberRepository.findOne(member_no);
    if (!findMember) {
      throw new NotFoundException(`Not Found Member No.${member_no}`);
    }
    return findMember;
  }

  async memberDelete(member_no: number): Promise<Number> {
    const ret = await this.memberRepository.delete(member_no);
    if (ret.affected > 0) {
      return ret.affected;
    }
    throw new NotFoundException(`Not Found Member No ${member_no}`);
  }

  async memberUpdate(
    member_no: number,
    memberUpdateDto: MemberUpdateDto,
  ): Promise<Member> {
    const qr = await getConnection().createQueryRunner();
    try {
      await qr.startTransaction();

      const findMember = await this.memberRepository.findOne(member_no);
      if (!findMember) {
        throw new NotFoundException(`Not Found Member memberNo ${member_no}`);
      }

      findMember.member_name = memberUpdateDto.member_name;
      findMember.member_email = memberUpdateDto.member_email;
      findMember.member_pw = memberUpdateDto.member_pw;

      const updateMember = await this.memberRepository.save(findMember);

      await qr.commitTransaction();

      return updateMember;
    } catch (error) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }

    return null;
  }

  async memberFindAll(): Promise<Member[]> {
    const memberList = await this.memberRepository.find({});
    return memberList;
  }
}
