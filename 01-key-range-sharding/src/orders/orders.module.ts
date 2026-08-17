import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShardingService } from '../sharding/sharding.service';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order], 'db_a'),
    TypeOrmModule.forFeature([Order], 'db_b'),
    TypeOrmModule.forFeature([Order], 'db_c'),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ShardingService],
})
export class OrdersModule {}
