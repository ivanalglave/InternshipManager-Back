import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PeopleService } from 'src/people/people.service';

@Injectable()
export class LoginService {
  constructor(
    private peopleService: PeopleService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.peopleService.login(username, pass);
    if (user && user.passwordHash == pass) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const req = await this.validateUser(user.email, user.passwordHash);
    if(req != null) {
        const payload = { email: user.email, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
  }
}
