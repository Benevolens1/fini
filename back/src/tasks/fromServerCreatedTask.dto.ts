import { Allow, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class FromServerCreatedTaskDto {

    @IsNotEmpty()
    taskId: string;

    @IsNotEmpty()
    state: string;

    @MaxLength(255)
    title: string;

    @Allow()
    content: string;
}