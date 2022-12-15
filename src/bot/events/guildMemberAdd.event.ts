import { InjectDiscordClient, On } from "@discord-nestjs/core";
import { Injectable } from "@nestjs/common";
import { Client, EmbedBuilder, GuildMember, GuildTextBasedChannel } from "discord.js";

@Injectable()
export class GuildMemberAddEvent {
  constructor(@InjectDiscordClient() private readonly client: Client) {}

  @On('guildMemberAdd')
  async addMember(member: GuildMember): Promise<void> {
    //const guildSettings = await this.guildService.findGuildById(member.guild.id);
    // TODO: FIX HARDCODED CHANNELS
    const welcomeChannel = member.guild.channels.cache.get('1020076728292491285') as GuildTextBasedChannel;

    const WelcomeEmbed = new EmbedBuilder()
      .setColor('#2F3136')
      .setDescription(`Добро пожаловать, <@${member.id}>! За полным доступом сюда <#1023651349021327481>.`);
    
    welcomeChannel.send({ embeds: [WelcomeEmbed] });
  }
}
