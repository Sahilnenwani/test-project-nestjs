import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from './auth/jwt/jwt.strategy';
import { ApiValidations } from './auth/validator/response';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.signup.dto';
import { Role } from 'src/guards/role.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/')
  @ApiValidations(false)
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signUp(createUserDto);
  }

  @Get('/auth/me')
  @ApiValidations(true, [Role.USER])
  async getAuthUser(@CurrentUser() user): Promise<User> {
    return await this.userService.showUser(user.id);
  }

  @Put('/:user_id')
  @ApiValidations(true, [Role.USER])
  async updateUser(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return await this.userService.updateUser(user_id, updateUserDto);
  }

  @Delete('/:user_id')
  @ApiValidations(true, [Role.USER])
  async deleteUser(@Param('user_id') user_id: string): Promise<boolean> {
    return await this.userService.deleteUser(user_id);
  }
}
