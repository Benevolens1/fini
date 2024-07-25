import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { Sequelize } from 'sequelize-typescript';
import { FromUserProposedTaskDto } from './fromUserProposedTask.dto';
import { CommonService } from '../common/common.service';
import { FromServerCreatedTaskDto } from './fromServerCreatedTask.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
        private sequelize: Sequelize,
        private commonService: CommonService
    ) { }

    async findAll(boardId: string): Promise<Task[]> {
        return this.taskModel.findAll({where: {boardId: boardId}});
    }

    async createTask(
        fromUserProposedTaskDto: FromUserProposedTaskDto,
        boardId: string
    ): Promise<Task | null> {
        let task;
        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t };

                const taskId = this.commonService.makeRandomId()

                task = {
                    taskId: taskId,
                    state: fromUserProposedTaskDto.state,
                    title: fromUserProposedTaskDto.title,
                    content: fromUserProposedTaskDto.content,
                    boardId: boardId
                }

                await this.taskModel.create(task, transactionHost);
            });
        } catch (err) {
            console.log(err);
            task = null
        } finally {
            return task
        }
    }

    async deleteTask(taskId: string, boardId: string): Promise<boolean> {
        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t };

                const task = await this.taskModel.findOne({ where: { taskId: taskId, boardId: boardId } });
                await task.destroy();
            });
            return true;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    async updateTask(
        fromServerCreatedTaskDto: FromServerCreatedTaskDto,
        boardId: string
    ): Promise<void> {
        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t };

                let updatedTask = {
                    taskId: fromServerCreatedTaskDto.taskId,
                    state: fromServerCreatedTaskDto.state,
                    title: fromServerCreatedTaskDto.title,
                    content: fromServerCreatedTaskDto.content,
                    boardId: boardId
                }

                await this.taskModel.update(updatedTask, {
                    where: {
                        taskId: fromServerCreatedTaskDto.taskId,
                        boardId: boardId
                    }
                });
            });
        } catch (err) {
            console.log(err)
        }
    }
}
