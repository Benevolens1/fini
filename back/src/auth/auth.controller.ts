import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialDto } from '../credentials/credential.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('signin')
    async signIn(@Body() credentialDto: CredentialDto) {
        return await this.authService.signIn(credentialDto.username, credentialDto.password);
    }
}
