import { TransformPipe } from "@discord-nestjs/common";
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from "@discord-nestjs/core";
import { SetupDto } from "./dto/setup.dto";

@Command({
  name: "song",
  description: "Конфигурация сервера",
})
@UsePipes(TransformPipe)
export class SetupCommand implements DiscordTransformedCommand<SetupDto> {
  handler(
    @Payload() dto: SetupDto,
    interaction: TransformedCommandExecutionContext
  ): string {
    console.log("DTO", dto);
    console.log('Interaction', interaction);
    
    return `Start playing ${dto.song}.`;
    }
}
