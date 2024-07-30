import { Column, Model, Table } from "sequelize-typescript";

@Table
export class TaskPerson extends Model {
    @Column
    taskId: string;

    @Column
    personId: string

    @Column
    boardId: string;
}