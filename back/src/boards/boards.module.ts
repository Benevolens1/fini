import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { CredentialsModule } from 'src/credentials/credentials.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Board]),
        CredentialsModule
    ],
    providers: [BoardsService],
    controllers: [BoardsController]
})
export class BoardsModule {}
