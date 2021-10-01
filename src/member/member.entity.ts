import { BaseEntity } from 'src/cls/baseentity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member extends BaseEntity {
  /**
   * Member No
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  member_no: number;
  /**
   * Member Id
   */
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  member_id: string;
  /**
   * Member Password
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  member_pw: string;
  /**
   * Member Name
   */
  @Column({ type: 'varchar', length: 20, nullable: true })
  member_name: string;
  /**
   * Member Email
   */
  @Column({ type: 'varchar', length: 30, nullable: true })
  member_email: string;
}
