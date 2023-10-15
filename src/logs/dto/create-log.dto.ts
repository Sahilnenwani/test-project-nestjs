import { LogAction } from '../enums/log.action.enum';

export class CreateLogDto {
  message: string;
  action: LogAction;
}
