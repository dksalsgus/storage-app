import { BaseEntity } from 'src/cls/baseentity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Storage } from '../storage/storage.entity';

@Entity()
export class Member extends BaseEntity {
  /**
   * 회원 번호
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  member_no: number;
  /**
   * 회원 아이디
   */
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  member_id: string;
  /**
   * 회원 비밀번호
   */
  @Column({ type: 'varchar', length: 60, nullable: true })
  member_pw: string;
  /**
   * 회원 이름
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  member_name: string;
  /**
   * 회원 이메일
   */
  @Column({ type: 'varchar', length: 30, nullable: true })
  member_email: string;

  @OneToMany((type) => Storage, (storage) => storage.member)
  storages: Storage[];
}
