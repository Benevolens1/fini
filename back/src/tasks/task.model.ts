import { Column, Model, Table } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

@Table
export class Task extends Model {
    @Column
    taskId: string;

    @Column({defaultValue: 'todo'})
    state: string;

    @Column
    title: string;

    @Column(DataType.TEXT)
    content: string;

    @Column
    boardId: string;
}