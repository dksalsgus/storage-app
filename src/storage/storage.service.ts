import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './storage.entity';
import { StorageRepository } from './storage.repository';
import { CreateStorageDto } from './dto/createstorage.dto';
import { Member } from 'src/member/member.entity';
import { getConnection } from 'typeorm';
import { UpdateStorageDto } from './dto/updatestorage.dto';

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

  async findById(storage_no: number): Promise<Storage> {
    const storage = await this.storageRepository.findOne({ storage_no });
    if (!storage) {
      throw new NotFoundException(`Not Found Storage No.${storage_no}`);
    }
    return storage;
  }
  async findAll(member: Member): Promise<Storage[]> {
    const storages = await this.storageRepository.find({ member });
    return storages;
  }
  async delete(storage_no: number): Promise<void> {
    const storage = await this.storageRepository.delete({ storage_no });
  }

  async update(
    storage_no: number,
    updateStorageDto: UpdateStorageDto,
  ): Promise<Storage> {
    const qr = getConnection().createQueryRunner();
    try {
      qr.startTransaction();
      const findStorage = await this.findById(storage_no);
      findStorage.storage_kind = updateStorageDto.storage_kind;
      findStorage.storage_name = updateStorageDto.storage_name;

      const saveStorage = await this.storageRepository.save(findStorage);
      qr.commitTransaction();
      return saveStorage;
    } catch (error) {
      qr.rollbackTransaction();
    } finally {
      qr.release();
    }
    return null;
  }
}
