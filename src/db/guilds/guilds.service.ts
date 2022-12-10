import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGuildDto } from "./dto/create-guild.dto";
import { Guild } from "./guilds.model";

@Injectable()
export class GuildsService {
  constructor(@InjectModel(Guild) private guildRepository: typeof Guild) {}

  async createGuild(dto: CreateGuildDto) {
    const guild = await this.guildRepository.create(dto);
    return guild;
  }
  async deleteGuild(guild_id: string) {
    await this.guildRepository.destroy({ where: { guild_id } });
  }
  async updateGuild(data) {
    await this.guildRepository.update(
      { auth_channel_id: data.auth_channel_id, auth_role_id: data.auth_role_id },
      {where: { guild_id: data.guild_id }}
    );
  }
  async findGuildById(guild_id: string) {
    const guild = await this.guildRepository.findOne({ where: { guild_id } });
    return guild;
  }
}
