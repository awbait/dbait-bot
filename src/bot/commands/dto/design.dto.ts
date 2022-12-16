import { Channel, Param } from '@discord-nestjs/core';
import { ChannelType } from 'discord.js';

export class DesignDto {
  @Param({
    name: 'channel',
    description: 'Выберите канал',
    required: true,
  })
  @Channel([ChannelType.GuildText])
  channel: string;
}
