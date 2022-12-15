import { DiscordGuard, EventArgs } from '@discord-nestjs/core';
import { ClientEvents, InteractionType } from 'discord.js';

export class IsHNYButtonInteractionGuard implements DiscordGuard {
  canActive(
    event: keyof ClientEvents,
    [interaction]: EventArgs<'interactionCreate'>,
  ): boolean | Promise<boolean> {
    return (
      event === 'interactionCreate' && interaction.isButton() && interaction.customId === 'button_happy-new-year'
    );
  }
}