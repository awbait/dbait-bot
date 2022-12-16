import { Command } from "@discord-nestjs/core";
import { AuthSubCommand } from "./sub-commands/auth.command";
import { DesignSubCommand } from "./sub-commands/design-role.command";
import { HappyNewYearSubCommand } from "./sub-commands/new-year.command";

@Command({
  name: 'setup',
  description: 'Конфигурация сервера',
  include: [
    AuthSubCommand,
    DesignSubCommand,
    HappyNewYearSubCommand
  ]
})
export class SetupCommand {}
