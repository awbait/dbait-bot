import { DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { GatewayIntentBits } from "discord.js";
import { GuildsModule } from "src/db/guilds/guilds.module";
import { BotGateway } from "./bot.gateway";
import { BotService } from "./bot.service";
import { SetupCommand } from "./commands/setup.command";
import { GuildCreateEvent } from "./events/guildCreate.event";
import { GuildMemberAddEvent } from "./events/guildMemberAdd.event";

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.DISCORD_TOKEN,
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
          ],
        },
        // Правила регистрации команд
        registerCommandOptions: [
          {
            forGuild: '1020076727474606111',
            removeCommandsBefore: true,
          }
        ],
        failOnLogin: true,
      }),
    }),
    GuildsModule,
  ],
  providers: [
    BotGateway,
    BotService,
    GuildMemberAddEvent,
    GuildCreateEvent,
    SetupCommand
  ],
})
export class BotModule {}
