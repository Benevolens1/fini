import { Injectable } from '@nestjs/common';
import { Credential } from './credential.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CredentialsService {
    constructor(
        @InjectModel(Credential)
        private credentialModel: typeof Credential,
    ) {}

    async isValidUsername(username: string) {
        const account: Credential = await this.credentialModel.findOne({where: {username: username}});
        if (account === null) {
            return false;
        } else if (account.username === username) {
            return true;
        } else {
            false;
        }
    }

    async isValidPassword(username: string, password:string) {
        const account: Credential = await this.credentialModel.findOne({ where: {username: username}});
        const isMatch = await bcrypt.compare(password, account.hash)
        if (account.username == username && isMatch) {
            return true;
        } else {
            return false;
        }

    }
}
