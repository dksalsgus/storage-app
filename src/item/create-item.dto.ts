import { IsDate, IsString } from 'class-validator';

export class CreateItemDto {
  /**
   * 내용물 이름
   */
  @IsString()
  item_name: string;
  /**
   * 내용물 종류
   */
  @IsString()
  item_kind: string;
  /**
   * 유통기한
   */
  @IsDate()
  item_expire: Date;
}
