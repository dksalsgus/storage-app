import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/member.decorator';
import { Member } from 'src/member/member.entity';
import { Storage } from './storage.entity';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateStorageDto } from './dto/createstorage.dto';
import { UpdateStorageDto } from './dto/updatestorage.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('storage')
@UseGuards(JwtAuthGuard)
@ApiTags('Storage API')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('list')
  @ApiOperation({summary:'냉장고 찾기'})
  async getStorage(@AuthUser() member: Member): Promise<Storage[]> {
    console.log(member);
    const storages = this.storageService.findAll(member);
    return storages;
  }

  @Post()
  @ApiOperation({summary:'냉장고 만들기'})
  async createStorage(
    @AuthUser() member: Member,
    @Body() createStorageDto: CreateStorageDto,
  ): Promise<Storage> {
    const storage = await this.storageService.create(member, createStorageDto);
    return storage;
  }

  @Get(':storage_no')
  @ApiOperation({summary:'냉장고 ID로 찾기'})
  async getStorageById(
    @Param('storage_no') storage_no: number,
  ): Promise<Storage> {
    const storage = await this.storageService.findById(storage_no);
    return storage;
  }

  @Delete(':storage_no')
  @ApiOperation({summary:'냉장고 삭제'})
  async deleteStorage(@Param('storage_no') storage_no: number): Promise<void> {
    await this.storageService.delete(storage_no);
  }

  @Patch(':storage_no')
  @ApiOperation({summary:'냉장고 수정'})
  async updateStorage(
    @Param('storage_no') storage_no: number,
    @Body() updateStorageDto: UpdateStorageDto,
  ): Promise<Storage> {
    const storage = await this.storageService.update(
      storage_no,
      updateStorageDto,
    );
    return storage;
  }
}
