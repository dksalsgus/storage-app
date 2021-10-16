import { EntityRepository, Repository } from 'typeorm';
import { Item } from './item.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async findAllByStorageNo(storage_no: number): Promise<Item[]> {
    const qb = this.createQueryBuilder('item');
    const itmes = await qb
      .where('item.storageStorageNo=:storage_no ', { storage_no })
      .getMany();
    return itmes;
  }

  async findByStorageNoAndItemNo(
    storage_no: number,
    item_no: number,
  ): Promise<Item> {
    const qb = this.createQueryBuilder('item');
    const item = await qb
      .where('item.storageStorageNo=:storage_no ', { storage_no })
      .andWhere('item.item_no=:item_no', { item_no })
      .getOne();
    if (!item) {
      throw new NotFoundException(`Not Found Item ${item_no}`);
    }
    return item;
  }
}
