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
import { GuildsService } from "src/db/guilds/guilds.service";
import { HappyNewYearDto } from "../dto/happy-new-year.dto";

@SubCommand({
  name: "happy-new-year",
  description: "Конфигурация канала авторизации",
})
@UsePipes(TransformPipe)
export class HappyNewYearSubCommand implements DiscordTransformedCommand<HappyNewYearDto> {
  constructor(
    private guildService: GuildsService,
    private botService: BotService
  ) {}
  async handler(
    @Payload() dto: HappyNewYearDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<Object> {
    // TODO: Admin Role 
    // const guildConfig = await this.guildService.updateGuild({ auth_channel_id: dto.channel,
    //   auth_role_id: dto.role }, interaction.guild.id);

    const authEmbed = new EmbedBuilder()
      .setColor("#2F3136")
      .setTitle(":d22_snow1: С Наступающим Новым Годом!")
      .setImage('https://www.gastronom.ru/binfiles/images/20221114/b4588df6.jpg');
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("button_happy-new-year")
          .setEmoji("✅")
          .setLabel("Получить ачивку")
          .setStyle(ButtonStyle.Secondary)
      );
    const msg = { embeds: [authEmbed], components: [row] }
    // if (guildConfig.auth_message_id) {
    //   this.botService.updateMessage(guildConfig.auth_channel_id, guildConfig.auth_message_id, msg);
    // } else {
    const newMsg = await this.botService.sendMessage(dto.channel, msg);
    //   this.guildService.updateGuild({ auth_message_id: newMsg.id }, interaction.guild.id);
    // }

    return {
      content: "Данные обновлены",
      ephemeral: true,
    };
  }
}
