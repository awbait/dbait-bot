import { DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { GatewayIntentBits } from "discord.js";
import { ServersModule } from "src/db/servers/servers.module";
import { ServersService } from "src/db/servers/servers.service";
import { BotGateway } from "./bot.gateway";
import { GuildCreateDeleteEvent } from "./events/guildCreateDelete.event";

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.DISCORD_TOKEN,
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
          ],
        },
        // Правила регистрации команд
        registerCommandOptions: [
          {
            forGuild: '1020076727474606111',
            removeCommandsBefore: true,
          },
          {
            forGuild: '758372773923258399',
            removeCommandsBefore: true,
          }
        ],
        failOnLogin: true,
      }),
    }),
    ServersModule
  ],
  providers: [
    BotGateway,

    /* Events */
    GuildCreateDeleteEvent
    // GuildCreateEvent,
    // GuildMemberAddEvent,
    // InteractionCreateEvent,

    // SetupCommand,
    // AuthSubCommand,
    // HappyNewYearSubCommand,
    // BotService
  ],
})
export class BotModule {}
