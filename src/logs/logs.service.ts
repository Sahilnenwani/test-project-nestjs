import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsRepository } from './log.repository';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogsRepository)
    private logsRepository: LogsRepository,
  ) {}
  create(createLogDto: CreateLogDto) {
    try {
      return this.logsRepository.createLog(createLogDto);
    } catch (error) {
      return false;
    }
  }
}
