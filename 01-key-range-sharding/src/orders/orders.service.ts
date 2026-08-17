import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShardName } from '../database/shard-name';
import { ShardingService } from '../sharding/sharding.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  private readonly repositories: Record<ShardName, Repository<Order>>;

  constructor(
    @InjectRepository(Order, 'db_a') repoA: Repository<Order>,
    @InjectRepository(Order, 'db_b') repoB: Repository<Order>,
    @InjectRepository(Order, 'db_c') repoC: Repository<Order>,
    private readonly shardingService: ShardingService,
  ) {
    this.repositories = { db_a: repoA, db_b: repoB, db_c: repoC };
  }

  async create(
    dto: CreateOrderDto,
  ): Promise<{ shard: ShardName; order: Order }> {
    const shard = this.shardingService.resolveShard(dto.id);
    const repository = this.repositories[shard];
    const order = repository.create(dto);
    await repository.save(order);
    return { shard, order };
  }

  async findById(id: number): Promise<{ shard: ShardName; order: Order }> {
    const shard = this.shardingService.resolveShard(id);
    const repository = this.repositories[shard];
    const order = await repository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(
        `Order ${id} não encontrado no shard ${shard}`,
      );
    }
    return { shard, order };
  }

  async distribution(): Promise<Record<ShardName, number>> {
    const [db_a, db_b, db_c] = await Promise.all([
      this.repositories.db_a.count(),
      this.repositories.db_b.count(),
      this.repositories.db_c.count(),
    ]);
    return { db_a, db_b, db_c };
  }
}
