import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Credential } from './credential.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class CredentialsService {


    constructor(
        @InjectModel(Credential)
        private credentialModel: typeof Credential,
        private sequelize: Sequelize,
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
        if (!account) {
            return false;
        }
        const isMatch = await bcrypt.compare(password, account.hash)
        if (account.username == username && isMatch) {
            return true;
        } else {
            return false;
        }
    }

    async signUp(username: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        try {
            await this.credentialModel.create({username, hash})
        } catch(err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                throw new ForbiddenException();
            }
        }
    }

    async getAllUsers() {
        return await this.credentialModel.findAll();
    }

    async deleteUser(username: string) {
        await this.credentialModel.destroy({where: {username}});
    }

    async changePassword(username: string, newPassword: string) {
        const newHash = await bcrypt.hash(newPassword, 10)
        await this.credentialModel.update({hash: newHash}, {where: {username}});
    }
}
