import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class IGetUserDTO {
    @IsNotEmpty()
    @IsString()
    id:string
}