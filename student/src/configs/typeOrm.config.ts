import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Department } from "src/entities/department.entity";
import { Score } from "src/entities/score.entity";
import { Student } from "src/entities/student.entity";
import { Subject } from "src/entities/subject.entity";

export const typeOrmConfig:TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'lamvuyvy98',
    database: 'MST',
    entities: [Department,Student,Subject,Score],
    synchronize: false,
}