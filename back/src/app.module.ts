import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './tasks/task.model';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/board.model';
import { CommonModule } from './common/common.module';
import { CredentialsModule } from './credentials/credentials.module';
import { Credential } from './credentials/credential.model';


@Module({
  imports: [
    BoardsModule,
    TasksModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.NODE_ENV + 'database.sqlite',
      models: [Task, Board, Credential],
      synchronize: true
    }),
    CommonModule,
    CredentialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
