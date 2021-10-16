import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from './item.repository';
import { Item } from './item.entity';
import { StorageService } from '../storage/storage.service';
import { CreateItemDto } from './create-item.dto';
import { getConnection, QueryResult } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository) readonly itemRepository: ItemRepository,
    private readonly storageService: StorageService,
  ) {}

  async createItem(
    storage_no: number,
    createItemDto: CreateItemDto,
  ): Promise<Item> {
    const qr = getConnection().createQueryRunner();
    try {
      qr.startTransaction();
      const findStorage = await this.storageService.findById(storage_no);
      if (!findStorage) {
        throw new NotFoundException(`Not Found Storage No = ${storage_no}`);
      }

      const newItem = new Item();
      newItem.item_name = createItemDto.item_name;
      newItem.item_kind = createItemDto.item_kind;
      newItem.item_expire = createItemDto.item_expire;
      newItem.storage = findStorage;
      const createItem = await this.itemRepository.create(newItem);

      const item = await this.itemRepository.save(createItem);

      qr.commitTransaction();
      return item;
    } catch (error) {
      qr.rollbackTransaction();
    } finally {
      qr.release();
    }
  }

  async findByIdItem(storage_no: number, item_no: number): Promise<Item> {
    const qr = getConnection().createQueryRunner();
    try {
      qr.startTransaction();
      qr.commitTransaction();
      return null;
    } catch (error) {
      qr.rollbackTransaction();
    } finally {
      qr.release();
    }
  }
  async updateItem(storage_no: number, item_no: number): Promise<Item> {
    const qr = getConnection().createQueryRunner();
    try {
      qr.startTransaction();
      qr.commitTransaction();
      return null;
    } catch (error) {
      qr.rollbackTransaction();
    } finally {
      qr.release();
    }
  }
  async deleteItem(storage_no: number, item_no: number): Promise<void> {
    const qr = getConnection().createQueryRunner();
    try {
      qr.startTransaction();
      qr.commitTransaction();
      return null;
    } catch (error) {
      qr.rollbackTransaction();
    } finally {
      qr.release();
    }
  }
  async findAllItem(storage_no: number): Promise<Item[]> {
    const items = await this.itemRepository.findAllByStorageNo(storage_no);
    return items;
  }
}
