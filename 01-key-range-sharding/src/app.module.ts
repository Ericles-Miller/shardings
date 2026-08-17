import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createShardConnection } from './database/create-shard-connection';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(
      createShardConnection('db_a', 'DB_A_HOST', 'DB_A_PORT'),
    ),
    TypeOrmModule.forRootAsync(
      createShardConnection('db_b', 'DB_B_HOST', 'DB_B_PORT'),
    ),
    TypeOrmModule.forRootAsync(
      createShardConnection('db_c', 'DB_C_HOST', 'DB_C_PORT'),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
