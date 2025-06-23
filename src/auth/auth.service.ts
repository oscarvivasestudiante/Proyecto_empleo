import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      // Aquí aseguramos que el token incluya id, roles, name y email
      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          roles: user.roles,
          name: user.fullName,   // Asumiendo que usas fullName en la entidad
          email: user.email,
        }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        fullName: true,
        roles: true,
      },
    });

    if (!user || !user.password) {
      throw new BadRequestException('Credenciales no válidas (email)');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Credenciales no válidas (password)');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles,
      token: this.getJwtToken({
        id: user.id,
        roles: user.roles,
        name: user.fullName,
        email: user.email,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload & { name: string; email: string }) {
    return this.jwtService.sign(payload);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(
      'Por favor chequea los logs del servidor'
    );
  }
}
