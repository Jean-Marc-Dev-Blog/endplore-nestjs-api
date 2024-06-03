import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  login() {
    return 'LOGIN';
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    // TODO: Check password with hashed password
    const match = password === user.password;

    if (!match) {
      return null;
    }

    return user;
  }
}
