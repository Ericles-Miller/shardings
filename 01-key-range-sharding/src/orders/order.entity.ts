import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: number;

  @Column()
  client: string;

  @Column('numeric', { precision: 10, scale: 2 })
  value: number;

  @CreateDateColumn({ name: 'created_at', type: 'date' })
  createdAt: string;
}
