import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
    constructor(private peopleService: PeopleService) {}

    @Get(':boardId')
    async findAll(@Param('boardId') boardId: string) {
        return await this.peopleService.findAllPeople(boardId);
    }
}
