import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';

@Module({
  controllers: [],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
