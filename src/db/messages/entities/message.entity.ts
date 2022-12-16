import { Server } from "src/db/servers/entities/server.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public message_name: string;

  @Column()
  public channel_id: string;

  @Column({ nullable: true})
  public role_id: string;

  @Column()
  public message_id: string;

  @ManyToOne(() => Server, (server) => server.messages)
  @JoinColumn({ name: "server_id" })
  server: Server; 
}
