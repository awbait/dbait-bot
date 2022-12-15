import { CreateServerDto } from "src/db/servers/dto/create-server.dto";

export class CreateMessageDto {
  readonly message_name: string;
  readonly channel_id: string;
  readonly role_id: string;
  readonly message_id: string;
  readonly guild_id: string;
}
