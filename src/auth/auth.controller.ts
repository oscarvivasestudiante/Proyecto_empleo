import {
  Controller,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/auth.entity';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Datos recibidos para registro:', createUserDto); // <-- Agregado
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private3')
  @Auth(ValidRoles.empleador)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      message: 'Hola mundo privado 3',
      user,
    };
  }
}
