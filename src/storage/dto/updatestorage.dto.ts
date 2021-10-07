import { IsEnum, IsString } from 'class-validator';
import { EnStorageKind } from '../storage.entity';

export class UpdateStorageDto {
  /**
   * 냉장고 이름
   */
  @IsString()
  storage_name: string;
  /**
   * 냉장고 종류
   */
  @IsEnum(EnStorageKind)
  storage_kind: EnStorageKind;
}
