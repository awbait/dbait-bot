import { Command } from "@discord-nestjs/core";
import { AuthSubCommand } from "./sub-commands/auth.command";
import { HappyNewYearSubCommand } from "./sub-commands/new-year.command";

@Command({
  name: 'setup',
  description: 'Конфигурация сервера',
  include: [
    AuthSubCommand,
    HappyNewYearSubCommand
  ]
})
export class SetupCommand {}
