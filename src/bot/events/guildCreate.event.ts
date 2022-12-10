import { InjectDiscordClient, On } from "@discord-nestjs/core";
import { Injectable, Logger } from "@nestjs/common";
import { Client, Guild } from "discord.js";
import { GuildsService } from "src/db/guilds/guilds.service";
import { BotGateway } from "../bot.gateway";

@Injectable()
export class GuildCreateEvent {
  constructor(
    private guildService: GuildsService,
    @InjectDiscordClient() private readonly client: Client
  ) {}
  private readonly logger = new Logger(BotGateway.name);

  @On("guildCreate")
  async guildCreate(guild: Guild): Promise<void> {
    this.logger.log(`Guild created: ${guild.name}`);
    this.guildService.createGuild({ guild_id: guild.id });
  }

  @On("guildDelete")
  async guildDelete(guild: Guild): Promise<void> {
    this.logger.log(`Guild delete: ${guild.name}`);
    this.guildService.deleteGuild(guild.id);
  }
}
