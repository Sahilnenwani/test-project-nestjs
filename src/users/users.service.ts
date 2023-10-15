import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.signup.dto';
import { LogsService } from 'src/logs/logs.service';
import { LogAction } from 'src/logs/enums/log.action.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject(LogsService)
    private logService: LogsService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { password, email } = createUserDto;
    const isEmailExist = await this.usersRepository.isEmailExist(email);
    if (isEmailExist) {
      throw new ConflictException(`Email Already Exist!`);
    }
    const user = await this.usersRepository.createUser(createUserDto);
    if (!user) {
      throw new InternalServerErrorException('Please try again later');
    }
    if (!password) {
      Object.assign(createUserDto, {
        password: Math.floor(100000 + Math.random() * 900000),
      });
    }
    await this.logService.create({
      message: `user is created userId:${user?.id}`,
      action: LogAction.CREATE,
    });
    return user;
  }

  async showUser(user_id: number) {
    try {
      const user = await this.usersRepository.getUserById(user_id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Please try again later');
    }
  }

  async getUserById(user_id: number) {
    return await this.usersRepository.getUserById(user_id);
  }

  async updateUser(user_id: string | number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersRepository.updateUserById(
      user_id,
      updateUserDto,
    );
    if (!updateUser) {
      throw new InternalServerErrorException('Please try again later');
    }
    await this.usersRepository.getUserById(user_id);
    await this.logService.create({
      message: `user's data is updated userId:${user_id}`,
      action: LogAction.UPDATE,
    });
    return true;
  }

  async deleteUser(user_id: string) {
    await this.usersRepository.deleteUserById(user_id);
    await this.logService.create({
      message: `user's data is deleted userId:${user_id}`,
      action: LogAction.DELETE,
    });
    return true;
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }
}
