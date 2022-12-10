import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Guild } from 'src/db/guilds/guilds.model';
import { GuildsService } from './guilds.service';

@Module({
  providers: [GuildsService],
  exports: [GuildsService],
  imports: [
    SequelizeModule.forFeature([Guild])
  ]
})
export class GuildsModule {}
