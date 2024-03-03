import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class InUserRegister {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    password: string;
}
export class InUserLogin {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    password: string;
}