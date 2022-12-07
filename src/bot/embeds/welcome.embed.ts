import { InjectDiscordClient } from "@discord-nestjs/core";
import { Injectable } from "@nestjs/common";
import { Client } from "discord.js";

@Injectable()
export class WelcomeEmbed {
  constructor(@InjectDiscordClient() private readonly client: Client) {}

  async WelcomeEmbedTemplate() {
    
  }
}
