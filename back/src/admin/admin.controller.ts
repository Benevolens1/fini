import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';
import CreateUserDto from './createUser.dto';
import { CredentialDto } from '../credentials/credential.dto';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('totalNumberOfBoards')
    async getTotalNumberOfBoards() {
        const number = await this.adminService.getNumberOfBoards();
        return {number};
    }

    @Get('users')
    async getUsers() {
        return await this.adminService.getUsers();
    }


    @Post('user')
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.adminService.createUser(createUserDto.username, createUserDto.password);
    }

    @Delete('user/:username')
    async deleteUser(@Param('username') username: string) {
        await this.adminService.deleteUser(username);
    }

    @Post('password')
    async changeUserPassword(@Body() credentialDto: CredentialDto) {
        await this.adminService.changeUserPassword(credentialDto.username, credentialDto.password)
    }
    
}
