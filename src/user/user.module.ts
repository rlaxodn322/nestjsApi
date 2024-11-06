import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthoGuard } from 'src/auth/auth.guard';
import { JwtStrategy } from './jwtstrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService, AuthoGuard, JwtStrategy],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
