import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Board extends Model {
    @Column
    boardId: string;

    @Column
    title: string;

    @Column
    creator: string;
}