import { Module } from '@nestjs/common';
import { TaskpeopleController } from './taskpeople.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskPerson } from './taskperson.model';
import { TaskpeopleService } from './taskpeople.service';
import { TaskpeopleGateway } from './taskpeople.gateway';

@Module({
    imports: [SequelizeModule.forFeature([TaskPerson])],
    controllers: [TaskpeopleController],
    providers: [TaskpeopleService, TaskpeopleGateway],
    exports: [TaskpeopleService]
})
export class TaskpeopleModule {}
