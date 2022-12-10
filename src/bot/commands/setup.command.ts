import { Command } from "@discord-nestjs/core";
import { AuthSubCommand } from "./sub-commands/auth.command";

@Command({
  name: 'setup',
  description: 'Конфигурация сервера',
  include: [
    AuthSubCommand
  ]
})
export class SetupCommand {}
