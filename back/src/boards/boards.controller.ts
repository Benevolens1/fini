import { Controller, Get, Param, HttpRedirectResponse, HttpException, HttpStatus, NotFoundException, Body } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { randomBytes } from 'crypto'
import { CredentialsService } from 'src/credentials/credentials.service';
import { CredentialDto } from 'src/credentials/credential.dto';

@Controller('boards')
export class BoardsController {
    constructor(
        private boardsService: BoardsService,
        private crendentailsService: CredentialsService
    ) {}

    @Get('newboard')
    async newBoard(@Body() credentialDto: CredentialDto) {
        const username = credentialDto.username;
        const password = credentialDto.password;
        if (this.crendentailsService.isValidPassword(username, password)) {
            const rb = randomBytes(16);
            const boardId = rb.toString('hex');
            await this.boardsService.createBoard(boardId);
            return {boardId: boardId};
        } else {
            throw new HttpException('wrong password', HttpStatus.FORBIDDEN);
        }
    }

    @Get('/boardId/:boardId')
    async checkBoard(@Param('boardId') boardId: string) {
        if (await this.boardsService.boardExists(boardId)) {
            return {"statusCode": 200, "message": "ok"};
        } else {
            throw new NotFoundException("This board does not exist");
        }
    }
}
