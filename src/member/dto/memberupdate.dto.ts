import { IsString, IsEmail } from 'class-validator';
export class MemberUpdateDto {
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
