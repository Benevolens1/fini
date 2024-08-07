import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './board.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class BoardsService {
    constructor(
        @InjectModel(Board)
        private boardsModel: typeof Board,
        private sequelize: Sequelize
    ) {}

    async boardExists(boardId: string): Promise<boolean> {
        let board = await this.boardsModel.findOne({where: {boardId}});
        let exists = board != null;
        return exists;
    }

    async createBoard(boardId: string, title: string = boardId, creator: string): Promise<void> {
        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t};
                await this.boardsModel.create(
                    {boardId, title, creator},
                    transactionHost
                );
            });
        } catch (err) {
            console.log(err)
        }
    }

    async getBoardFromCreator(creator: string): Promise<Board[]> {
        return await this.boardsModel.findAll({where : {creator}});
    }

    async deleteBoard(boardId: string) {
        await this.boardsModel.destroy({where: {boardId}});
    }
}
