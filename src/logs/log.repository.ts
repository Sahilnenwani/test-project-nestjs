import { EntityRepository, Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';

@EntityRepository(Log)
export class LogsRepository extends Repository<Log> {
  async createLog(createUserDto: CreateLogDto) {
    const { message, action } = createUserDto;
    try {
      const log = new Log();
      log.message = message;
      if (action) log.action = action;
      await this.save(log);
      return true;
    } catch (error) {
      return false;
    }
  }
}
