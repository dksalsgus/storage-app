import { IsString } from 'class-validator';

export class AuthLoginDto {
  /**
   * Member Id
   */
  @IsString()
  member_id: string;
  /**
   * Member Pw
   */
  @IsString()
  member_pw: string;
}
