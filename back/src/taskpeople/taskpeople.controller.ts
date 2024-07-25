import { Controller, Get, Param } from '@nestjs/common';

@Controller('taskpeople')
export class TaskpeopleController {
    constructor() {}

    @Get(':boardId')
    findAll(@Param('boardId') boardId: string) {
        return [];
    }
}
