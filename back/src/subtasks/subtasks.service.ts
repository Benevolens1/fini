import { Injectable } from '@nestjs/common';
import { Subtask } from './subtask.model';
import { InjectModel } from '@nestjs/sequelize';
import createSubtaskDto from './create-subtask.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class SubtasksService {
    constructor(
        @InjectModel(Subtask)
        private subtaskModel: typeof Subtask,
        private commonService: CommonService
    ) {}

    async findAll(boardId: string): Promise<Subtask[]> {
        return await this.subtaskModel.findAll({where: {boardId}});
    }

    async createSubtask(subtaskDto: createSubtaskDto, boardId: string): Promise<Subtask|null> {
        const subtask = {
            taskId: this.commonService.makeRandomId(),
            parentId: subtaskDto.parentId,
            content: subtaskDto.content,
            state: subtaskDto.state,
            boardId,
        }
        return await this.subtaskModel.create(subtask);
    }

    async updateSubtask(subtask, boardId) {
        return await this.subtaskModel.update(subtask, {where: {taskId: subtask.taskId, boardId}});
    }

    async deleteSubtask(taskId: string, boardId: string) {
        return await this.subtaskModel.destroy({where: {taskId, boardId}});
    }
}
