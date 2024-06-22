import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { TokenPayload } from '../../token/token.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
      ignoreExpiration: false,
    });
  }

  validate(payload: TokenPayload): Partial<User> {
    return {
      id: payload.sub,
      email: payload.email,
      jobRole: payload.jobRole,
    };
  }
}
