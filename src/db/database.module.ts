import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServersModule } from './servers/servers.module';
import { MessagesModule } from './messages/messages.module';
import { Server } from "./servers/entities/server.entity";
import { Message } from "./messages/entities/message.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [Server, Message],
        synchronize: true,
      })
    }),
    ServersModule,
    MessagesModule
  ]
})
export class DatabaseModule {}