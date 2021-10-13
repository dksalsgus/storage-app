import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from './item.repository';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository) readonly itemRepository: ItemRepository,
  ) {}

  async createItem(): Promise<Item> {
    return null;
  }

  async findByIdItem(): Promise<Item> {
    return null;
  }
  async updateItem(): Promise<Item> {
    return null;
  }
  async deleteItem(): Promise<void> {
    return null;
  }
  async findAllItem(): Promise<Item[]> {
    return null;
  }
}
