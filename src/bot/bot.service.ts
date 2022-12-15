import { InjectDiscordClient } from "@discord-nestjs/core";
import { Injectable } from "@nestjs/common";
import {
  BaseGuildTextChannel,
  Client,
} from "discord.js";

@Injectable()
export class BotService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client
  ) {}
  async sendMessage(channelId: string, message: Object) {
    const channel = this.client.channels.cache.get(channelId) as BaseGuildTextChannel;
    const msg = await channel.send(message);
    return msg;
  }

  async updateMessage(channelId: string, messageId: string, newMessage: Object) {
    const channel = this.client.channels.cache.get(channelId) as BaseGuildTextChannel;
    const message = await channel.messages.fetch(messageId);
    if (!message) return false;
    
    const msg = await message.edit(newMessage);
    return msg;
  }
}
