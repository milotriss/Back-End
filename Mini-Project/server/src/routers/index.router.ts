import {Express} from "express";
import studentController from "../controllers/student.controller";

const Router = (server:Express) => {
    server.use('/api/v1/students',studentController);
}
export default Router;