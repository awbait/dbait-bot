import { Message } from "src/db/messages/entities/message.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'servers' })
export class Server {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public guild_id: string;

  @OneToMany(() => Message, (message) => message.server)
  @JoinColumn()
  messages: Message[];
}