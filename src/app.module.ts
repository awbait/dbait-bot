import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { DatabaseModule } from './db/database.module';
import { ServersModule } from './db/servers/servers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    DatabaseModule,
    BotModule,
    // GuildsModule,
    // MessagesModule,
  ],
})
export class AppModule {}
