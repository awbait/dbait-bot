import { TransformPipe } from "@discord-nestjs/common";
import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  TransformedCommandExecutionContext,
  UsePipes,
} from "@discord-nestjs/core";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { BotService } from "src/bot/bot.service";
import { MessagesService } from "src/db/messages/messages.service";
import { HappyNewYearDto } from "../dto/happy-new-year.dto";

@SubCommand({
  name: "happy-new-year",
  description: "Конфигурация канала дизайна",
})
@UsePipes(TransformPipe)
export class HappyNewYearSubCommand
  implements DiscordTransformedCommand<HappyNewYearDto>
{
  constructor(
    private botService: BotService,
    private messagesService: MessagesService
  ) {}
  async handler(
    @Payload() dto: HappyNewYearDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<Object> {
    const hnyEmbed = new EmbedBuilder()
      .setColor("#2F3136")
      .setTitle("С Наступающим Новым Годом!")
      .setImage(
        "https://i.imgur.com/aLmczMD.png"
      );

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("button_happy-new-year")
        .setEmoji("✅")
        .setLabel("Получить ачивку")
        .setStyle(ButtonStyle.Secondary)
    );
    const msg = { embeds: [hnyEmbed], components: [row] };

    let savedMessage = await this.messagesService.findOne({
      message_name: "happy_new_year_2023",
      server: { guild_id: interaction.guild.id },
    });

    if (savedMessage) {
      this.botService.updateMessage(savedMessage.channel_id, savedMessage.message_id, msg);
    } else {
      const newMsg = await this.botService.sendMessage(dto.channel, msg);
      savedMessage = await this.messagesService.create({
        message_name: 'happy_new_year_2023',
        channel_id: dto.channel,
        role_id: dto.role,
        message_id: newMsg.id,
        guild_id: interaction.guild.id
      })
    }

    return {
      content: "Конфигурация изменена",
      ephemeral: true,
    };
  }
}
