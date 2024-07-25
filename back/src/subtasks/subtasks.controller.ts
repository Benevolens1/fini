import { Controller, Get, Param } from '@nestjs/common';

@Controller('subtasks')
export class SubtasksController {
    constructor() {}

    @Get(':boardId')
    findAll(@Param('boardId') boardId: string) {
        return [];
    }
}

