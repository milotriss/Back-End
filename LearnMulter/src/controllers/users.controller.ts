import express from "express";
import uploadCloud from "../configs/multerCloud.config";
import UserService from "../services/user.service";
import bcrypt from 'bcryptjs'

const userController = express.Router();
const userService = new UserService();
userController
  .get("/", async (req: express.Request, res: express.Response) => {
    try {
      const data = await userService.getAllUsers();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Get all users failed: Server");
    }
  })
  .post("/create", async (req: express.Request, res: express.Response) => {
    try {
      var salt = bcrypt.genSaltSync(9);  // định nghĩa thuật toán để băm password
      var hashPass = bcrypt.hashSync(req.body.password, salt);// hàm hashSync để băm password
      const data = {
        email: req.body.email,
        password: hashPass,
        name: req.body.name,
        age: req.body.age,
      };
      await userService.createUser(data);
      res.status(200).json("Created successfully");
    } catch (error) {
      res.status(500).json("Create failed: server");
    }
  })
  .post('/login', async (req: express.Request, res: express.Response) =>{
    try {
      const loginForm = {
        email: req.body.email,
        password: req.body.password
      }
      await userService.login(loginForm)
      res.status(200).json();
    } catch (error) {
      res.status(500).json("Login failed: server");
    }
  })
  .post(
    "/update/:id",
    uploadCloud.single("avatar"),
    async (req: express.Request, res: express.Response) => {
      const file = req.file as Express.Multer.File;
      if (file) {
        try {
          console.log(req.body);
          
          const id = +req.params.id;
          const data = {
            ...req.body,
            avatar: file.path,
          };
          const result: any = await userService.updateUser(id, data);
          if (result[0] === 0) {
            res.status(404).json("not found");
          } else {
            res.status(200).json("Updated successfully");
          }
        } catch (error) {
          res.status(500).json("Update failed: server");
        }
      } else {
        try {
          const id = +req.params.id;
          const data = {
            ...req.body,
          };
          const result: any = await userService.updateUser(id, data);
          if (result[0] === 0) {
            res.status(404).json("not found");
          } else {
            res.status(200).json("Updated successfully");
          }
        } catch (error) {
          res.status(500).json("Update failed: server");
        }
      }
    }
  );
export default userController;
