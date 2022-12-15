import { DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { GatewayIntentBits } from "discord.js";
import { MessagesModule } from "src/db/messages/messages.module";
import { ServersModule } from "src/db/servers/servers.module";
import { ServersService } from "src/db/servers/servers.service";
import { BotGateway } from "./bot.gateway";
import { BotService } from "./bot.service";
import { SetupCommand } from "./commands/setup.command";
import { AuthSubCommand } from "./commands/sub-commands/auth.command";
import { HappyNewYearSubCommand } from "./commands/sub-commands/new-year.command";
import { GuildCreateDeleteEvent } from "./events/guildCreateDelete.event";
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
    ServersModule,
    MessagesModule
  ],
  providers: [
    BotGateway,
    BotService,

    /* Events */
    GuildCreateDeleteEvent,
    InteractionCreateEvent,
    // GuildMemberAddEvent,

    /* Commands */
    SetupCommand,
    AuthSubCommand,
    HappyNewYearSubCommand
  ],
})
export class BotModule {}
