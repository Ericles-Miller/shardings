import { ShardName } from '../database/shard-name';

export interface ShardRange {
  shard: ShardName;
  min: number;
  max: number;
}

export const SHARD_RANGES: ShardRange[] = [
  { shard: 'db_a', min: 1, max: 1000 },
  { shard: 'db_b', min: 1001, max: 2000 },
  { shard: 'db_c', min: 2001, max: 3000 },
];
