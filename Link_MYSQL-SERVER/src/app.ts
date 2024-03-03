import express from "express";
import cors from "cors";
import { urlencoded } from "body-parser";
import controllers from "./controllers/controller";
import * as dotenv from "dotenv";
import connection from "./configs/db.config";
import { info } from "./tables";

dotenv.config();
const server = express();
const PORT = process.env.PORT;
server.use(urlencoded());
server.use(cors());
// npm
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!!!");
});
connection.query(info, (err, data) => {
  if (err) {
    console.log("Error create table");
  }
  console.log("created table");
});
server
  .route("/")
  .get((req: express.Request, res: express.Response) => {
    connection.query(
      `select * from user inner join info on user.id = info.userId`,
      (err: any, data: any) => {
        if (err) {
          console.log("err");
        }
        res.json(data);
      }
    );
  })
  .post((req: express.Request, res: express.Response) => {
    connection.execute(
      `insert into user(name) values(?)`,[req.body.name],
      (err: any, data: any) => {
        if (err) {
          console.log("err");
        } else {
          res.json("add success");
        }
      }
    );
  })
 server.patch('users/:id',(req: express.Request, res: express.Response) => {
    connection.execute(`update user set name = ? where id = ?`,[],(err: any,data:any)=> {
        if (err) {
          console.log("err");
        } else {
          res.json("update success");
        }
    })
  })

server.listen(PORT, () =>
  console.log(`http://localhost:${PORT} SERVER OK FEN`)
);
