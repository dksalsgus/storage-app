import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class MemberJoinDto {
  @IsString()
  @ApiProperty({description:'멤버 아이디'})
  readonly member_id: string;
  @IsString()
  @ApiProperty({description:'멤버 비밀번호'})
  readonly member_pw: string;
  @IsString()
  @ApiProperty({description:'멤버 이름'})
  readonly member_name: string;
  @IsString()
  @IsEmail()
  @ApiProperty({description:'멤버 이메일'})
  readonly member_email: string;
}
