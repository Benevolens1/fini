import { Controller, Get, Param, NotFoundException, Body, Post, Req, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { randomBytes } from 'crypto'
import { CredentialsService } from '../credentials/credentials.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('boards')
export class BoardsController {
    constructor(
        private boardsService: BoardsService,
        private crendentialsService: CredentialsService
    ) { }

    @UseGuards(AuthGuard)
    @Post('newboard')
    async newBoard(@Req() req, @Body('title') title) {
        const creator = req.user.username;
        const rb = randomBytes(16);
        const boardId = rb.toString('hex');
        await this.boardsService.createBoard(boardId, title, creator);
        return { boardId: boardId };

    }

    @Get('/boardId/:boardId')
    async checkBoard(@Param('boardId') boardId: string) {
        if (await this.boardsService.boardExists(boardId)) {
            return { "statusCode": 200, "message": "ok" };
        } else {
            throw new NotFoundException("This board does not exist");
        }
    }

    @UseGuards(AuthGuard)
    @Get('myboards')
    async getMyBoards(@Req() req) {
        return await this.boardsService.getBoardFromCreator(req.user.username);
    }

    @UseGuards(AuthGuard)
    @Post('deleteBoard/:boardId')
    async deleteBoard(@Param('boardId') boardId: string, @Req() req) {
        const hisBoards = await this.boardsService.getBoardFromCreator(req.user.username);
        if (hisBoards.some((board) => board.boardId === boardId)) {
            await this.boardsService.deleteBoard(boardId);
        }

    }
}
