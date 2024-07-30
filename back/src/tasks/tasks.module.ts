import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TasksGateway } from './tasks.gateway';
import { CommonModule } from '../common/common.module';
import { TaskpeopleModule } from '../taskpeople/taskpeople.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Task]),
    CommonModule,
    TaskpeopleModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksGateway]
})
export class TasksModule {}
