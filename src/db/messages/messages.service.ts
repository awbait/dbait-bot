import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServersService } from '../servers/servers.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    private serversService: ServersService
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { message_name, channel_id, message_id, role_id } = createMessageDto;
    let message = new Message();
    message.server = await this.serversService.findOne({ guild_id: createMessageDto.guild_id });
    message.message_name = message_name;
    message.channel_id = channel_id;
    message.message_id = message_id;
    message.role_id = role_id;

    await this.messagesRepository.save(message);

    return message;
  }

  findAll() {
    return `This action returns all messages`;
  }

  async findOne(data: object) {
    const row = await this.messagesRepository.findOne({ where: data, relations: ['server'] })
    return row;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
