import { IsEmail, IsNotEmpty, IsInt, MinLength, MaxLength, IsStrongPassword, IsString } from "class-validator";

export class ICreateUserDTO {
    
    @IsNotEmpty()
    @IsString()
    role : string

    @IsNotEmpty()
    name : string

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    password : string

    @IsNotEmpty()
    @IsString()
    photo : string
}