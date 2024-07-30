import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Subtask extends Model {
    @Column
    taskId: string;

    @Column
    parentId: string;

    @Column(DataType.TEXT)
    content: string;

    @Column({defaultValue: 'todo'})
    state: string;

    @Column
    boardId: string;
}