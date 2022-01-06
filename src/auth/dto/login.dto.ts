import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @ApiProperty({description:'멤버 아이디'})
  member_id: string;
  
  @IsString()
  @ApiProperty({description:'멤버 비밀번호'})
  member_pw: string;
}
