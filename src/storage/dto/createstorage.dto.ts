import { EnStorageKind } from '../storage.entity';

export class CreateStorageDto {
  /**
   * 냉장고 이름
   */
  storage_name: string;
  /**
   * 냉장고 종류
   */
  storage_kind: EnStorageKind;
}
