import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { CryptographyService } from '../cryptography/cryptography.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, CryptographyService],
})
export class AuthModule {}
