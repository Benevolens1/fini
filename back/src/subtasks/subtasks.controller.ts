import { Controller, Get, Param } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';

@Controller('subtasks')
export class SubtasksController {
    constructor(
        private SubtaskService: SubtasksService
    ) {}

    @Get(':boardId')
    async findAll(@Param('boardId') boardId: string) {
        return await this.SubtaskService.findAll(boardId);
    }
}

