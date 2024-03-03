import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class InCreateRate {
    @IsNotEmpty()
    @IsInt()
    productId:number

    @IsNotEmpty()
    @IsInt()
    rateStar:number

    @IsNotEmpty()
    @IsString()
    content:string
}