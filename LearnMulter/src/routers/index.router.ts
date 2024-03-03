import {Express} from 'express'
import userController from '../controllers/users.controller';
const routers = (server:Express) => {
    server.use('/users',userController)
}
export default routers;