import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Credential extends Model {
    @Column
    username: string;

    @Column
    hash: string;
}