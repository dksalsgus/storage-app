import { BaseEntity } from 'src/cls/baseentity';
import { Storage } from 'src/storage/storage.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  /**
   * 내용물 번호
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  item_no: number;
  /**
   * 내용물 이름
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  item_name: string;
  /**
   * 내용물 종류
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  item_kind: string;
  /**
   * 유통기한
   */
  @Column({ type: 'datetime', nullable: true })
  item_expire: Date;

  @ManyToOne((_type) => Storage, (storage) => storage.storage_no)
  storage: Storage;
}
