import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './person.model';
import { CommonModule } from '../common/common.module';
import { PeopleGateway } from './people.gateway';

@Module({
    imports: [SequelizeModule.forFeature([Person]), CommonModule],
    controllers: [PeopleController],
    providers: [PeopleService, PeopleGateway]
})
export class PeopleModule {}
