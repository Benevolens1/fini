import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsService } from '../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private credentialsService: CredentialsService,
        private jwtService: JwtService
    ) {}

    async signIn(
        username: string,
        password: string,
      ): Promise<{ access_token: string }> {
        if (!(await this.credentialsService.isValidPassword(username, password))) {
            throw new UnauthorizedException();
        }
        const payload = { username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
