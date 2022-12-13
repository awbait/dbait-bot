import { DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { GatewayIntentBits } from "discord.js";
import { GuildsModule } from "src/db/guilds/guilds.module";
import { BotGateway } from "./bot.gateway";
import { SetupCommand } from "./commands/setup.command";
import { AuthSubCommand } from "./commands/sub-commands/auth.command";
import { GuildCreateEvent } from "./events/guildCreate.event";
import { GuildMemberAddEvent } from "./events/guildMemberAdd.event";
import { BotService } from './bot.service';
import { InteractionCreateEvent } from "./events/interactionCreate.event";

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
    GuildsModule,
  ],
  providers: [
    BotGateway,

    GuildMemberAddEvent,
    GuildCreateEvent,
    InteractionCreateEvent,

    SetupCommand,
    AuthSubCommand,
    BotService
  ],
})
export class BotModule {}
