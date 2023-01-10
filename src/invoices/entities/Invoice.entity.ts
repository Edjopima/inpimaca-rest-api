import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  products: string;

  @Column()
  total: number;

  @Column()
  clientId: number;

  @Column()
  companyId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
