import { Column, Model, Table, Unique } from "sequelize-typescript";

@Table
export class Credential extends Model {

    @Unique
    @Column
    username: string;

    @Column
    hash: string;
}