import { InjectDiscordClient, On } from "@discord-nestjs/core";
import { Injectable, Logger } from "@nestjs/common";
import { Client, EmbedBuilder, Message, TextChannel } from "discord.js";

@Injectable()
export class TestEmbedded {
  private readonly logger = new Logger();
  
  constructor(@InjectDiscordClient() private readonly client: Client) {}

  // @On('messageCreate')
  // async onCreateMessage(message: Message): Promise<void> {
  //   this.logger.log(`MESSAGE: ${message}`);
  //   this.SendEmded();
  // }

  // async SendEmded() {
  //   let guild = this.client.guilds.cache.get('1020076727474606111')
  //   // let channel = guild.channels.cache.get('1020471490124185680');
  //   //const channel = await this.client.channels.cache.find(channel => channel.id === '1020471490124185680');
  //   const channel = this.client.channels.cache.get("1020471490124185680") as TextChannel;
  //   console.log(channel);

  //   const exampleEmbed = new EmbedBuilder()
  //     .setColor(0x0099FF)
  //     .setTitle('Some title')
  //     .setURL('https://discord.js.org/')
  //     .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
  //     .setDescription('Some description here')
  //     .setThumbnail('https://i.imgur.com/AfFp7pu.png')
  //     .addFields(
  //       { name: 'Regular field title', value: 'Some value here' },
  //       { name: '\u200B', value: '\u200B' },
  //       { name: 'Inline field title', value: 'Some value here', inline: true },
  //       { name: 'Inline field title', value: 'Some value here', inline: true },
  //     )
  //     .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
  //     .setImage('https://i.imgur.com/AfFp7pu.png')
  //     .setTimestamp()
  //     .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  //   channel.send({ embeds: [exampleEmbed] });
  // }
}