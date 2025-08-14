import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('revenues')
export class RevenueEntity {
  @PrimaryColumn({ type: 'uuid', name: 'id', nullable: false, unique: true })
  id: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ type: 'uuid', name: 'equity_id', nullable: false })
  equityId: string;

  @Column({ type: 'uuid', name: 'account_id', nullable: false })
  accountId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;
}
