import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ApiValidations } from './validator/response';
import { LoginUserDto } from '../dto/user-login.dto';

@ApiTags('Auth')
@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiValidations(false)
  @Post('login')
  signIn(@Body() authCredentialsDto: LoginUserDto) {
    return this.authService.signIn(authCredentialsDto);
  }
}
