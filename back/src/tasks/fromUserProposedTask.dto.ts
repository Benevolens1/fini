import { Allow, IsNotEmpty } from "class-validator";

export class FromUserProposedTaskDto {

    @IsNotEmpty()
    state: string;

    @Allow()
    title: string;

    @Allow()
    content: string;
}