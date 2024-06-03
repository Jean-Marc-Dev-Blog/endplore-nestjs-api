import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptographyService } from '../cryptography/cryptography.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly cryptographyService: CryptographyService,
    private readonly tokenService: TokenService,
  ) {}

  login(user: User) {
    return this.tokenService.generateToken(user);
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    // TODO: Exclude "password" from user

    if (!user) {
      return null;
    }

    const match = await this.cryptographyService.verify(
      user.password,
      password,
    );

    if (!match) {
      return null;
    }

    return user;
  }
}
