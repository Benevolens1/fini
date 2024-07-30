import { Controller, Get, Param } from '@nestjs/common';
import { TaskpeopleService } from './taskpeople.service';

@Controller('taskpeople')
export class TaskpeopleController {
    constructor(
        private taskpeopleService: TaskpeopleService
    ) {}

    @Get(':boardId')
    async findAll(@Param('boardId') boardId: string) {
        return await this.taskpeopleService.findAll(boardId);
    }
}
