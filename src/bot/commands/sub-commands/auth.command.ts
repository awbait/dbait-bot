import { TransformPipe } from "@discord-nestjs/common";
import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  TransformedCommandExecutionContext,
  UsePipes,
} from "@discord-nestjs/core";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { BotService } from "src/bot/bot.service";
import { MessagesService } from "src/db/messages/messages.service";
import { AuthDto } from "../dto/auth.dto";

@SubCommand({
  name: "auth",
  description: "Конфигурация канала авторизации",
})
@UsePipes(TransformPipe)
export class AuthSubCommand implements DiscordTransformedCommand<AuthDto> {
  constructor(
    private botService: BotService,
    private messagesService: MessagesService
  ) {}
  async handler(
    @Payload() dto: AuthDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<Object> {
    // TODO: Admin Role

    const authEmbed = new EmbedBuilder()
      .setColor("#2F3136")
      .setTitle(":unlock: Авторизация")
      .setImage('https://i.imgur.com/Lwskovh.png');

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("button_auth")
          .setEmoji("✅")
          .setLabel("Авторизоваться")
          .setStyle(ButtonStyle.Success)
      );

    const msg = { embeds: [authEmbed], components: [row] };

    let savedMessage = await this.messagesService.findOne({
      message_name: "auth",
      server: { guild_id: interaction.guild.id },
    });
    
    if (savedMessage) {
      this.botService.updateMessage(savedMessage.channel_id, savedMessage.message_id, msg);
    } else {
      const newMsg = await this.botService.sendMessage(dto.channel, msg);
      savedMessage = await this.messagesService.create({
        message_name: 'auth',
        channel_id: dto.channel,
        role_id: dto.role,
        message_id: newMsg.id,
        guild_id: interaction.guild.id
      });
    }

    return {
      content: "Конфигурация изменена",
      ephemeral: true,
    };
  }
}
