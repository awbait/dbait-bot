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
  EmbedBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { BotService } from "src/bot/bot.service";
import { MessagesService } from "src/db/messages/messages.service";
import { DesignDto } from "../dto/design.dto";

@SubCommand({
  name: "design",
  description: "Конфигурация канала выдачи ролей дизайна",
})
@UsePipes(TransformPipe)
export class DesignSubCommand implements DiscordTransformedCommand<DesignDto> {
  constructor(private botService: BotService,
    private messagesService: MessagesService) {}
  async handler(
    @Payload() dto: DesignDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<Object> {
    // TODO: Admin Role

    // TODO: Role in DB?
    const roleDesign = interaction.guild.roles.cache.find((role) => role.id === "1020078166800343070");
    const designEmbed = new EmbedBuilder()
      .setColor("#2F3136")
      .setTitle("Роли дизайна")
      .setImage("https://i.imgur.com/R8WtYBP.png");

    const descriptionEmbed = new EmbedBuilder()
    .setColor("#2F3136")
    .setDescription(`Получите роль програмного обеспечения которое ты знаешь,  \n используешь или которым ты интересуешься.\n
      Выберите хотябы одну роль, чтобы получить роль <@&${roleDesign.id}>`);
    
    const designRoles = [
      {
        name: "Figma",
        roleId: "1053076373289316364",
        emoji: "ph",
      },
      {
        name: "Photoshop",
        roleId: "1053091062157164625",
        emoji: "ph",
      },
      {
        name: "Illustrator",
        roleId: "1053091082512126033",
        emoji: "ph",
      },
    ];
    
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("select_design")
        .setPlaceholder("Выберите роль")
        .addOptions(
          designRoles.map((designRole) => {
            return {
              label: designRole.name,
              value: designRole.roleId,
              emoji: `${interaction.guild.emojis.cache.find((emoji) => emoji.name === designRole.emoji)}`,
            };
          })
        )
    );

    const msg = { embeds: [designEmbed, descriptionEmbed], components: [row] };

    let savedMessage = await this.messagesService.findOne({
      message_name: "design",
      server: { guild_id: interaction.guild.id },
    });

    if (savedMessage) {
      this.botService.updateMessage(savedMessage.channel_id, savedMessage.message_id, msg);
    } else {
      const newMsg = await this.botService.sendMessage(dto.channel, msg);
      savedMessage = await this.messagesService.create({
        message_name: 'design',
        channel_id: dto.channel,
        message_id: newMsg.id,
        guild_id: interaction.guild.id
      });
    }

    return {
      content: "Данные обновлены",
      ephemeral: true,
    };
  }
}
