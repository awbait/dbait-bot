import { DiscordCommand, SubCommand } from "@discord-nestjs/core";
import { CommandInteraction, InteractionReplyOptions, EmbedBuilder } from "discord.js";

@SubCommand({
  name: 'welcome',
  description: 'Info'
})
export class WelcomeSubCommand implements DiscordCommand {
  handler(interaction: CommandInteraction): InteractionReplyOptions {
    const { user } = interaction;

    const embed = new EmbedBuilder()
      .setTitle('Welcome')
      .setImage(user.avatarURL())
      .addFields([{ name: 'Name', value: user.username }]);

    return {
      embeds: [embed],
    }
  }
}