import { InjectDiscordClient, On } from "@discord-nestjs/core";
import { Injectable } from "@nestjs/common";
import { Client, EmbedBuilder, GuildMember, GuildTextBasedChannel } from "discord.js";
import { GuildsService } from "src/db/guilds/guilds.service";

@Injectable()
export class GuildMemberAddEvent {
  constructor(@InjectDiscordClient() private readonly client: Client,
  private guildService: GuildsService,) {}

  @On('guildMemberAdd')
  async addMember(member: GuildMember): Promise<void> {
    const guildSettings = await this.guildService.findGuildById(member.guild.id);
    const welcomeChannel = member.guild.channels.cache.get(guildSettings.welcome_channel_id) as GuildTextBasedChannel;

    const WelcomeEmbed = new EmbedBuilder()
      .setColor('#36393F')
      .setDescription(`Добро пожаловать, <@${member.id}>! За полным доступом сюда <#1023651349021327481>.`);
    
    welcomeChannel.send({ embeds: [WelcomeEmbed] });
  }
}
