import { EntityRepository, Repository } from 'typeorm';
import { Item } from './item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async findAllByStorageNo(storage_no: number): Promise<Item[]> {
    const qb = this.createQueryBuilder('item');
    const itmes = qb
      .where('item.storageStorageNo=:storage_no ', { storage_no })
      .getMany();
    return itmes;
  }
}
