import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const credentials = { email, password } as LoginDto;
    const user = await this.authService.validateUser(credentials);

    if (user === null) {
      throw new UnauthorizedException(
        'User not found or passwords do not match',
      );
    }

    return user;
  }
}
