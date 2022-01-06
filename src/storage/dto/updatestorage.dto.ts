import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { EnStorageKind } from '../storage.entity';

export class UpdateStorageDto {
  @IsString()
  @ApiProperty({description:'냉장고 이름'})
  storage_name: string;
  @IsEnum(EnStorageKind)
  @ApiProperty({description:'냉장고 종류'})
  storage_kind: EnStorageKind;
}
