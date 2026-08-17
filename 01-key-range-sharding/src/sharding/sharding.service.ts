import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ShardName } from '../database/shard-name';
import { SHARD_RANGES } from './shard-range';

@Injectable()
export class ShardingService {
  resolveShard(id: number): ShardName {
    const range = SHARD_RANGES.find((r) => id >= r.min && id <= r.max);
    if (!range)
      throw new UnprocessableEntityException(
        `id ${id} está fora das faixas suportadas (1-3000)`,
      );

    return range.shard;
  }
}
