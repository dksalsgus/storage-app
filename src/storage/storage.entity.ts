import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../cls/baseentity';
import { Member } from '../member/member.entity';

export enum EnStorageKind {
  일반 = '일반',
  양문형 = '양문형',
  대용량 = '대용량',
}

@Entity()
export class Storage extends BaseEntity {
  /**
   * 냉장고 번호
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  storage_no: number;
  /**
   * 냉장고 이름
   */
  @Column({ nullable: false, type: 'varchar' })
  storage_name: string;
  /**
   * 냉장고 종류
   */
  @Column({
    nullable: true,
    type: 'enum',
    enum: EnStorageKind,
    default: EnStorageKind.일반,
  })
  storage_kind: EnStorageKind;

  @ManyToOne((type) => Member, (member) => member.member_no)
  member: Member;
}
