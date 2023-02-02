import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Login } from 'src/types/login';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() req: Login) {
    console.log('controller ' + req.email + req.passwordHash);
    return this.loginService.login(req);
  }
}
