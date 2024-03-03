import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class InCreateStudentDTO {
    @IsInt()
    @IsNotEmpty()
    departmentId:number

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    birthDay:string
}
export class InCreateScoreDTO {
    @IsInt()
    @IsNotEmpty()
    subjectId:number
    @IsInt()
    @IsNotEmpty()
    score:number
}