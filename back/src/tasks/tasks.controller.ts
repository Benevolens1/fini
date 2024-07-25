import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get(':boardId')
    findAll(@Param('boardId') boardId: string): Promise<Task[]> {
        return this.tasksService.findAll(boardId);
    }
}
