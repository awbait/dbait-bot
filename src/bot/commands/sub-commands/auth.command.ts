import { TransformPipe } from "@discord-nestjs/common";
import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  TransformedCommandExecutionContext,
  UsePipes,
} from "@discord-nestjs/core";
import { BotService } from "src/bot/bot.service";
import { GuildsService } from "src/db/guilds/guilds.service";
import { AuthDto } from "../dto/auth.dto";

@SubCommand({
  name: "auth",
  description: "Конфигурация канала авторизации",
})
@UsePipes(TransformPipe)
export class AuthSubCommand implements DiscordTransformedCommand<AuthDto> {
  constructor(private guildService: GuildsService,
    private botService: BotService) {}
  async handler(
    @Payload() dto: AuthDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<Object> {
    // TODO: Admin Role
    await this.guildService.updateGuild({
      auth_channel_id: dto.channel,
      auth_role_id: dto.role,
      guild_id: interaction.guild.id,
    });
    this.botService.sendAuthEmbed(interaction.guild.id);
    return {
      content: 'Данные обновлены',
      ephemeral: true
    };
  }
}
