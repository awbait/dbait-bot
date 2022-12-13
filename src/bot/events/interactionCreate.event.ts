import { InjectDiscordClient, On, UseGuards } from "@discord-nestjs/core";
import { Injectable, Logger } from "@nestjs/common";
import { Client } from "discord.js";
import { GuildsService } from "src/db/guilds/guilds.service";
import { BotGateway } from "../bot.gateway";
import { BotService } from "../bot.service";
import { IsAuthButtonInteractionGuard } from "../guards/IsAuthButtonInteraction.guard";

@Injectable()
export class InteractionCreateEvent {
  constructor(
    private guildService: GuildsService,
    private botService: BotService,
    @InjectDiscordClient() private readonly client: Client
  ) {}
  private readonly logger = new Logger(BotGateway.name);

  @On("interactionCreate")
  @UseGuards(IsAuthButtonInteractionGuard)
  async guildCreate(interaction): Promise<void> {
    const guildSettings = await this.guildService.findGuildById(interaction.guild.id);
    if (interaction.member.roles.cache.has(guildSettings.get("auth_role_id"))) {
      interaction.reply({ content: "Вы уже авторизованы.", ephemeral: true });
      return;
    }

    const role = interaction.guild.roles.cache.find(
      (role) => role.id === guildSettings.get("auth_role_id")
    );
    interaction.member.roles.add(role);
    interaction.reply({ content: `Вы были авторизованы!`, ephemeral: true });
  }
}
