import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class MemberUpdateDto {
  @IsString()
  @ApiProperty({description:'멤버 비밀번호'})
  readonly member_pw: string;
  /**
   * Member Name
   */
  @IsString()
  @ApiProperty({description:'멤버 이름'})
  readonly member_name: string;
  /**
   * Member Email
   */
  @IsString()
  @IsEmail()
  @ApiProperty({description:'멤버 이메일'})
  readonly member_email: string;
}
