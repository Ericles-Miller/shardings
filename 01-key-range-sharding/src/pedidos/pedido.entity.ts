import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: number;

  @Column()
  client: string;

  @Column('numeric', { precision: 10, scale: 2 })
  value: number;

  @Column('date', { name: 'created_at' })
  createdAt: string;
}
