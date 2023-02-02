import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PeopleModule } from 'src/people/people.module';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { jwtConstants } from '../constants';
// import { PeopleService } from 'src/people/people.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PeopleModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, JwtStrategy],
  exports: [LoginService],
})
export class LoginModule {}
