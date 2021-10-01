import { IsEmail, IsString } from 'class-validator';

export class MemberJoinDto {
  /**
   * Member Id
   */
  @IsString()
  readonly member_id: string;
  /**
   * Member Password
   */
  @IsString()
  readonly member_pw: string;
  /**
   * Member Name
   */
  @IsString()
  readonly member_name: string;
  /**
   * Member Email
   */
  @IsString()
  @IsEmail()
  readonly member_email: string;
}
