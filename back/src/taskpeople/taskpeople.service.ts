import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskPerson } from './taskperson.model';
import { TaskPersonDto } from './taskpersonDto.dto';

@Injectable()
export class TaskpeopleService {
    constructor(
        @InjectModel(TaskPerson)
        private taskPersonModel: typeof TaskPerson
    ) {}

    async findAll(boardId: string): Promise<TaskPerson[]> {
        return await this.taskPersonModel.findAll({where: {boardId}});
    }

    async createTaskPerson(taskId: string, personId: string, boardId: string): Promise<TaskPersonDto|null> {
        return await this.taskPersonModel.create({personId, taskId, boardId})
    }

    async removeTaskPerson(taskId: string, personId: string, boardId: string) {
        return await this.taskPersonModel.destroy({where: {personId, taskId, boardId}})
    }

    async removeAllTaskPersonOfAPerson(personId: string, boardId: string) {
        return await this.taskPersonModel.destroy({where: {personId, boardId}});
    }

    async removeAllTaskPersonOfATask(taskId: string, boardId: string) {
        return await this.taskPersonModel.destroy({where: {taskId, boardId}});
    }

}
