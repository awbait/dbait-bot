import { DiscordGuard, EventArgs } from '@discord-nestjs/core';
import { ClientEvents, InteractionType } from 'discord.js';

export class IsAuthButtonInteractionGuard implements DiscordGuard {
  canActive(
    event: keyof ClientEvents,
    [interaction]: EventArgs<'interactionCreate'>,
  ): boolean | Promise<boolean> {
    return (
      event === 'interactionCreate' && interaction.isButton() && interaction.customId === 'button_auth'
    );
  }
}