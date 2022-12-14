import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { ServersService } from './servers.service';

@Module({
  providers: [ServersService],
  imports: [TypeOrmModule.forFeature([Server])],
  exports: [ServersService],
})
export class ServersModule {}
