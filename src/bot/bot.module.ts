import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';
import { PlayCommand } from './commands/play.command';
import { GuildMemberAddEvent } from './events/guildMemberAdd.event';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.DISCORD_TOKEN,
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
        },
      }),
    }),
  ],
  providers: [BotGateway, BotService, PlayCommand, GuildMemberAddEvent],
})
export class BotModule {}
