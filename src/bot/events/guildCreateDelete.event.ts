import { InjectDiscordClient, On } from "@discord-nestjs/core";
import { Injectable, Logger } from "@nestjs/common";
import { Client, Guild } from "discord.js";
import { ServersService } from "src/db/servers/servers.service";
import { BotGateway } from "../bot.gateway";

@Injectable()
export class GuildCreateDeleteEvent {
  constructor(
    @InjectDiscordClient() private readonly client: Client,
    private serversService: ServersService
  ) {}
  private readonly logger = new Logger(BotGateway.name);

  @On("guildCreate")
  async guildCreate(guild: Guild): Promise<void> {
    this.logger.log(`Guild created: ${guild.name}`);
    this.serversService.create({ guild_id: guild.id });
  }

  @On("guildDelete")
  async guildDelete(guild: Guild): Promise<void> {
    this.logger.log(`Guild delete: ${guild.name}`);
    this.serversService.removeByGuildId(guild.id);
  }
}
