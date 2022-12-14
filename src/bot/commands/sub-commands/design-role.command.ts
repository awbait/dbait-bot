import { TransformPipe } from "@discord-nestjs/common";
import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  TransformedCommandExecutionContext,
  UsePipes,
} from "@discord-nestjs/core";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import { BotService } from "src/bot/bot.service";
import { GuildsService } from "src/db/guilds/guilds.service";
import { DesignDto } from "../dto/design.dto";

@SubCommand({
  name: "design",
  description: "Конфигурация канала выдачи ролей дизайна",
})
@UsePipes(TransformPipe)
export class DesignSubCommand implements DiscordTransformedCommand<DesignDto> {
  constructor(
    private guildService: GuildsService,
    private botService: BotService
  ) {}
  async handler(
    @Payload() dto: DesignDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<Object> {
    // TODO: Admin Role 
    const guildConfig = await this.guildService.updateGuild({ design_channel_id: dto.channel }, interaction.guild.id);

    const designEmbed = new EmbedBuilder()
      .setColor("#2F3136")
      .setTitle("Роли дизайна")
      .setImage('https://i.imgur.com/R8WtYBP.png');
    
    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_design')
          .setPlaceholder('Выберите роль')
          .addOptions(
            {
              label: 'Select me',
              description: 'This is a description',
              value: 'select_design_one',
              emoji: '⚙️',
            },
            {
              label: 'You can select me too',
              description: 'This is also a description',
              value: 'select_design_two',
              emoji: ':sunglasses:',
            },
          ),
      );

    const msg = { embeds: [designEmbed], components: [row] }

    // if (guildConfig.design_message_id) {
    //   this.botService.updateMessage(guildConfig.design_channel_id, guildConfig.design_message_id, msg);
    // } else {
    //   const newMsg = await this.botService.sendMessage(guildConfig.design_channel_id, msg);
    //   this.guildService.updateGuild({ design_message_id: newMsg.id }, interaction.guild.id);
    // }

    return {
      content: "Данные обновлены",
      ephemeral: true,
    };
  }
}
