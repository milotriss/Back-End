import express, { urlencoded } from "express";
import connection from "./configs/db.config";
import * as dotenv from "dotenv";
import sequelize from "./configs/db.config";
import { User } from "./models/user.model";
import createTable from "./models/index.model";
import { UserInfo } from "./models/userInfo.model";
import { Model, where } from "sequelize";

dotenv.config();
const server = express();
const PORT = process.env.PORT;
server.use(urlencoded());
sequelize.authenticate();
// createTable()

server
  // .get('/', async (req, res) =>{
  //     // await User.create({
  //     //     firstName: "Phuc",
  //     //     lastName:"SexGay"
  //     // })
  //     await UserInfo.create({
  //         age:21,
  //         gender:0,
  //         id:3
  //     })
  //     res.json("ok")
  // })
  .get("/test/orderby", async (req, res) => {
    const data = await UserInfo.findAll({
      where: {
        age: 20,
      },
      order: [["age", "DESC"]]
    });
    res.json(data);
  })
  .post("/users", async (req, res) => {
    const data = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.json(data);
  })
  .post("/users/:id", async (req, res) => {
    const id = +req.params.id;

    const data = await UserInfo.create({
      age: req.body.age,
      gender: req.body.gender,
      userId: id,
    });
    res.json(data);
  })
  .delete("/users/:id", async (req, res) => {
    const id = +req.params.id;
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.json("ok");
  })
  .patch("/users/:id", async (req, res) => {
    const id = +req.params.id;
    await UserInfo.update(
      { gender: req.body.gender },
      {
        where: {
          userId: id,
        },
      }
    );
    res.json("ok");
  });

server.listen(PORT, () =>
  console.log(`http://localhost:${PORT} SERVER OK FEN`)
);
