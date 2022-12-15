import { InjectDiscordClient, On, UseGuards } from "@discord-nestjs/core";
import { Injectable, Logger } from "@nestjs/common";
import { Client } from "discord.js";
import { MessagesService } from "src/db/messages/messages.service";
import { BotGateway } from "../bot.gateway";
import { IsAuthButtonInteractionGuard } from "../guards/IsAuthButtonInteraction.guard";
import { IsHNYButtonInteractionGuard } from "../guards/IsHNYButtonInteraction.guard";

@Injectable()
export class InteractionCreateEvent {
  constructor(
    @InjectDiscordClient() private readonly client: Client,
    private messagesService: MessagesService,
  ) {}
  private readonly logger = new Logger(BotGateway.name);

  @On("interactionCreate")
  @UseGuards(IsAuthButtonInteractionGuard)
  async guildCreate(interaction): Promise<void> {
    const interactionConfig = await this.messagesService.findOne({
      message_name: "auth",
      server: { guild_id: interaction.guild.id },
    });
    if (interaction.member.roles.cache.has(interactionConfig.role_id)) {
      interaction.reply({ content: "Вы уже авторизованы.", ephemeral: true });
      return;
    }

    const role = interaction.guild.roles.cache.find(role => role.id === interactionConfig.role_id);
    interaction.member.roles.add(role);
    interaction.reply({ content: `Вы были авторизованы!`, ephemeral: true });
  }

  @On("interactionCreate")
  @UseGuards(IsHNYButtonInteractionGuard)
  async addAchivement(interaction): Promise<void> {
    const interactionConfig = await this.messagesService.findOne({
      message_name: "happy_new_year_2023",
      server: { guild_id: interaction.guild.id },
    });
    if (interaction.member.roles.cache.has(interactionConfig.role_id)) {
      interaction.reply({ content: "Вы уже получили награду.", ephemeral: true });
      return;
    }

    const role = interaction.guild.roles.cache.find(role => role.id === interactionConfig.role_id);
    interaction.member.roles.add(role);

    // TODO: FIX HARDCODED DIVIDER
    if (!interaction.member.roles.cache.has('1052621571895853096')) {
      const roleDivider = interaction.guild.roles.cache.find(role => role.id === '1052621571895853096');
      interaction.member.roles.add(roleDivider);
    }
    interaction.reply({ content: `Награда получена!`, ephemeral: true });
  }
}
