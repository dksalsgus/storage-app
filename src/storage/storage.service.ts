import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './storage.entity';
import { StorageRepository } from './storage.repository';
import { CreateStorageDto } from './dto/createstorage.dto';
import { Member } from 'src/member/member.entity';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageRepository)
    private readonly storageRepository: StorageRepository,
  ) {}

  async create(
    member: Member,
    createStorageDto: CreateStorageDto,
  ): Promise<Storage> {
    const storage = new Storage();
    storage.storage_name = createStorageDto.storage_name;
    storage.storage_kind = createStorageDto.storage_kind;
    storage.member = member;

    const createSotrage = await this.storageRepository.create(storage);

    const newStorage = await this.storageRepository.save(createSotrage);
    return newStorage;
  }

  async findById(): Promise<Storage> {
    return null;
  }
  async findAll(): Promise<Storage[]> {
    return null;
  }
  async delete(): Promise<void> {
    return null;
  }

  async update(): Promise<Storage> {
    return null;
  }
}
