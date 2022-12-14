import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Server } from './entities/server.entity';

@Injectable()
export class ServersService {
  constructor(
    @InjectRepository(Server)
    private serversRepository: Repository<Server>,
  ) {}

  async create(createServerDto: CreateServerDto) {
    const server = await this.serversRepository.save(createServerDto);
    return server;
  }

  // findAll() {
  //   return `This action returns all servers`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} server`;
  // }

  // update(id: number, updateServerDto: UpdateServerDto) {
  //   return `This action updates a #${id} server`;
  // }

  async removeByGuildId(guild_id: string) {
    await this.serversRepository.delete({ guild_id });
    return `Removed #${guild_id} server`;
  }
}
