import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @ApiProperty({description:'내용물 이름'})
  item_name: string;
  @IsString()
  @ApiProperty({description:'내용물 종류'})
  item_kind: string;
  @IsDate()
  @ApiProperty({description:'내용물 유통기한'})
  item_expire: Date;
}
