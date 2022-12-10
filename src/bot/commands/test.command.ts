import { Command } from "@discord-nestjs/core";
import { WelcomeSubCommand } from "./sub-commands/welcome.command";

@Command({
  name: 'test',
  description: 'This is a test command',
  include: [
    WelcomeSubCommand,
  ]
})
export class TestCommand {}
