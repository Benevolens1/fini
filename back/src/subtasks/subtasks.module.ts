import { Module } from '@nestjs/common';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './subtasks.service';
import { Subtask } from './subtask.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonModule } from 'src/common/common.module';
import { SubtasksGateway } from './subtasks.gateway';

@Module({
    imports: [SequelizeModule.forFeature([Subtask]), CommonModule],
    controllers: [SubtasksController],
    providers: [SubtasksService, SubtasksGateway]
})
export class SubtasksModule {}
