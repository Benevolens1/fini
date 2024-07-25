import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './person.model';
import { ClientPersonDto } from './clientPersonDto.dto';
import { CommonService } from '../common/common.service';
import { serverPersonDto } from './serverPersonDto.dto';

@Injectable()
export class PeopleService {
    constructor(
        @InjectModel(Person)
        private personModel: typeof Person,
        private commonService: CommonService
    ) {}

    async findAllPeople(boardId: string): Promise<Person[]> {
        return await this.personModel.findAll({where: {boardId: boardId}});
    }

    async createPerson(clientPerson: ClientPersonDto, boardId: string ): Promise<Person | null> {
        const personId: string = this.commonService.makeRandomId();
        const serverPerson = {
            name: clientPerson.name,
            personId: personId,
            boardId: boardId 
        };
        return await this.personModel.create(serverPerson);
    }

    async removePerson(personId: string, boardId: string) {
        await this.personModel.destroy({where: {personId, boardId}});
        // don't forget to destroy taskpeople related to this person
    }
}
