import { IsOptional } from "class-validator";

export class CreateMessageDto {
  readonly message_name: string;
  readonly channel_id: string;

  @IsOptional()
  readonly role_id?: string;

  readonly message_id: string;
  readonly guild_id: string;
}
