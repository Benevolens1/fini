import { IsNotEmpty, IsString } from "class-validator";

export class CredentialDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}