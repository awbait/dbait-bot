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
import { AuthDto } from "../dto/auth.dto";

@SubCommand({
  name: "auth",
  description: "Конфигурация канала авторизации",
})
@UsePipes(TransformPipe)
export class AuthSubCommand implements DiscordTransformedCommand<AuthDto> {
  constructor(
    private guildService: GuildsService,
    private botService: BotService
  ) {}
  async handler(
    @Payload() dto: AuthDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<Object> {
    // TODO: Admin Role
    const guildConfig = await this.guildService.updateGuild({ auth_channel_id: dto.channel,
      auth_role_id: dto.role }, interaction.guild.id)

    ////////////////////////////////
    // const guildSettings = await this.guildService.findGuildById(guild_id);
    // const guild = await this.client.guilds.fetch(guild_id);
    // if (!guild) return;
    // const channel = (await guild.channels.fetch(
    //   guildSettings.get("auth_channel_id")
    // )) as GuildTextBasedChannel;
    // //console.log(channel)
    // if (!channel) return;

    // const authEmbed = new EmbedBuilder()
    //   .setColor("#2F3136")
    //   .setTitle("Авторизация")
    //   .setDescription("Для получения полного доступа, нажмите на кнопку ниже");

    // const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    //   new ButtonBuilder()
    //     .setCustomId("button_auth")
    //     .setEmoji("✅")
    //     .setLabel("Авторизоваться")
    //     .setStyle(ButtonStyle.Success)
    // );
    // channel.send({ embeds: [authEmbed], components: [row] });
    ////////////////////////////////

    const authEmbed = new EmbedBuilder()
      .setColor("#2F3136")
      .setTitle("Авторизация")
      .setDescription("Для получения полного доступа, нажмите на кнопку ниже");
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("button_auth")
          .setEmoji("✅")
          .setLabel("Авторизоваться")
          .setStyle(ButtonStyle.Success)
      );
    const msg = { embeds: [authEmbed], components: [row] }
    if (guildConfig.auth_message_id) {
      this.botService.updateMessage(guildConfig.auth_channel_id, guildConfig.auth_message_id, msg);
    } else {
      const newMsg = await this.botService.sendMessage(guildConfig.auth_channel_id, msg);
      this.guildService.updateGuild({ auth_message_id: newMsg.id }, interaction.guild.id);
    }

    return {
      content: "Данные обновлены",
      ephemeral: true,
    };
  }
}
