import { InjectDiscordClient } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { BaseGuildTextChannel, Client, GuildTextBasedChannel } from 'discord.js';
import { GuildsService } from 'src/db/guilds/guilds.service';

@Injectable()
export class BotService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private guildService: GuildsService
  ) {}
  async sendAuthEmbed(guild_id) {
    // https://vkusniyobed.ru/image/catalog/banner/logodljasajta.png
    const guildSettings = await this.guildService.findGuildById(guild_id);
    const guild = await this.client.guilds.fetch(guild_id)
    if (!guild) return;
    const channel = await guild.channels.fetch(guildSettings.get('auth_channel_id')) as GuildTextBasedChannel;
    //console.log(channel)
    if (!channel) return;

    channel.send('sfewf');
    
  }
}
