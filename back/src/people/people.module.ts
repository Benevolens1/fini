import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './person.model';
import { CommonModule } from '../common/common.module';
import { PeopleGateway } from './people.gateway';
import { TaskpeopleModule } from '../taskpeople/taskpeople.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Person]),
        CommonModule,
        TaskpeopleModule
    ],
    controllers: [PeopleController],
    providers: [PeopleService, PeopleGateway]
})
export class PeopleModule {}
