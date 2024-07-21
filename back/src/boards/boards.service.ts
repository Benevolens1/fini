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
        let board = await this.boardsModel.findOne({where: {boardId: boardId}});
        let exists = board != null;
        return exists;
    }

    async createBoard(boardId: string): Promise<void> {
        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t};
                await this.boardsModel.create(
                    {boardId: boardId},
                    transactionHost
                );
            });
        } catch (err) {
            console.log(err)
        }
    }
}
