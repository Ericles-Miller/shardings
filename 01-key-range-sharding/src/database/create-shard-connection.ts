import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Order } from '../orders/order.entity';
import { ShardName } from './shard-name';

export function createShardConnection(
  shard: ShardName,
  hostEnvKey: string,
  portEnvKey: string,
): TypeOrmModuleAsyncOptions {
  return {
    name: shard,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'postgres',
      host: config.getOrThrow<string>(hostEnvKey),
      port: config.getOrThrow<number>(portEnvKey),
      username: config.getOrThrow<string>('DB_USER'),
      password: config.getOrThrow<string>('DB_PASSWORD'),
      database: config.getOrThrow<string>('DB_NAME'),
      entities: [Order],
      synchronize: false,
    }),
  };
}
