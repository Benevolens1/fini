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
import { PeopleModule } from './people/people.module';
import { Person } from './people/person.model';
import { TaskpeopleModule } from './taskpeople/taskpeople.module';
import { TaskPerson } from './taskpeople/taskperson.model';
import { SubtasksModule } from './subtasks/subtasks.module';
import { Subtask } from './subtasks/subtask.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConcurrentmodifModule } from './concurrentmodif/concurrentmodif.module';


@Module({
  imports: [
    BoardsModule,
    TasksModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.NODE_ENV + 'database.sqlite',
      models: [Task, Board, Credential, Person, TaskPerson, Subtask],
      synchronize: true
    }),
    CommonModule,
    CredentialsModule,
    PeopleModule,
    TaskpeopleModule,
    SubtasksModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConcurrentmodifModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
