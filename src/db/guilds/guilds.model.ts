import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GuildCreationAttrs {
  guild_id: string;
}

@Table({ tableName: 'guilds' })
export class Guild extends Model<Guild, GuildCreationAttrs> {
  // @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  // id: number;

  @Column({ type: DataType.STRING(50), unique: true, allowNull: false })
  guild_id: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  welcome_channel_id: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  auth_channel_id: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  auth_role_id: string;
}
