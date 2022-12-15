import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServersModule } from '../servers/servers.module';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Module({
  providers: [MessagesService],
  imports: [TypeOrmModule.forFeature([Message]), ServersModule],
  exports: [MessagesService],
})
export class MessagesModule {}
