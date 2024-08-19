import { Injectable } from '@nestjs/common';
import { BoardsService } from '../boards/boards.service';
import { CredentialsService } from '../credentials/credentials.service';

@Injectable()
export class AdminService {
    
    constructor(
        private boardsService: BoardsService,
        private credentialService: CredentialsService
    ) {}

    async getNumberOfBoards() {
        return await this.boardsService.countAllBoards();
    }

    async getUsers() {
        const AllUsers = await this.credentialService.getAllUsers();
        const strippedUsers = AllUsers.map(user => user.username);
        return strippedUsers;
    }

    async createUser(username: string, password: string) {
        await this.credentialService.signUp(username, password);
    }

    async deleteUser(username: string) {
        await this.boardsService.deleteBoardsFromCreator(username);
        await this.credentialService.deleteUser(username);
    }

    async changeUserPassword(username: string, newPassword: string) {
        await this.credentialService.changePassword(username, newPassword);
    }

}
