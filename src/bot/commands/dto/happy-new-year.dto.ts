import { Channel, Param, ParamType } from '@discord-nestjs/core';
import { ChannelType } from 'discord.js';

export class HappyNewYearDto {
  @Param({
    name: 'channel',
    description: 'Выберите канал',
    required: true,
  })
  @Channel([ChannelType.GuildText])
  channel: string;

  @Param({
    name: 'role',
    description: 'Выберите роль',
    type: ParamType.ROLE,
    required: true,
  })
  role: string;
}
