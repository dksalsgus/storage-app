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
import { User } from 'src/auth/member.decorator';
import { Member } from 'src/member/member.entity';
import { Storage } from './storage.entity';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateStorageDto } from './dto/createstorage.dto';
import { UpdateStorageDto } from './dto/updatestorage.dto';

@Controller('storage')
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('list')
  async getStorage(@User() member: Member): Promise<Storage[]> {
    const storages = this.storageService.findAll(member);
    return storages;
  }

  @Post()
  async createStorage(
    @User() member: Member,
    @Body() createStorageDto: CreateStorageDto,
  ): Promise<Storage> {
    const storage = await this.storageService.create(member, createStorageDto);
    return storage;
  }

  @Get(':storage_no')
  async getStorageById(
    @Param('storage_no') storage_no: number,
  ): Promise<Storage> {
    const storage = await this.storageService.findById(storage_no);
    return storage;
  }

  @Delete(':storage_no')
  async deleteStorage(@Param('storage_no') storage_no: number): Promise<void> {
    await this.storageService.delete(storage_no);
  }

  @Patch(':storage_no')
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
