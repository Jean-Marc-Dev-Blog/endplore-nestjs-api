import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptographyService } from '../cryptography/cryptography.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly cryptographyService: CryptographyService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const createdUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (createdUser !== null) {
      throw new BadRequestException(
        'A user with this email is already signed up.',
      );
    }

    const user = this.usersRepository.create(createUserDto);
    user.password = await this.cryptographyService.hash(password);

    return this.usersRepository.save(user);
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (user === null) {
      throw new BadRequestException(`User with id ${id} not found.`);
    }

    return user;
  }
}
