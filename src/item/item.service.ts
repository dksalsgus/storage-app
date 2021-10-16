import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from './item.repository';
import { Item } from './item.entity';
import { StorageService } from '../storage/storage.service';
import { CreateItemDto } from './create-item.dto';
import { getConnection, QueryResult } from 'typeorm';
import { UpdateItmeDto } from './dto/update-item.dto';

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
    const item = await this.itemRepository.findByStorageNoAndItemNo(
      storage_no,
      item_no,
    );
    return item;
  }
  async updateItem(
    storage_no: number,
    item_no: number,
    updateItmeDto: UpdateItmeDto,
  ): Promise<Item> {
    const qr = getConnection().createQueryRunner();
    try {
      qr.startTransaction();
      const findItem = await this.findByIdItem(storage_no, item_no);
      findItem.item_name = updateItmeDto.item_name;
      findItem.item_kind = updateItmeDto.item_kind;
      findItem.item_expire = updateItmeDto.item_expire;

      const item = await this.itemRepository.save(findItem);
      qr.commitTransaction();
      return item;
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
      const item = await this.findByIdItem(storage_no, item_no);
      await this.itemRepository.delete({ item_no: item.item_no });
      qr.commitTransaction();
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
