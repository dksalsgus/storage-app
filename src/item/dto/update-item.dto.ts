import { ApiProperty } from "@nestjs/swagger";

export class UpdateItmeDto {
  @ApiProperty({description:'내용물 이름'})
  item_name: string;
  @ApiProperty({description:'내용물 종류'})
  item_kind: string;
  @ApiProperty({description:'내용물 유통기한'})
  item_expire: Date;
}
