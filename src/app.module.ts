import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { Guild } from './db/guilds/guilds.model';
import { GuildsModule } from './db/guilds/guilds.module';
import { MessagesModule } from './db/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Guild],
      autoLoadModels: true,
    }),
    BotModule,
    GuildsModule,
    MessagesModule,
  ],
})
export class AppModule {}
