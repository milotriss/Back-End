import express from 'express';


const userController = express.Router();


userController.route('/')
.get()
.post()
.patch()



export default userController