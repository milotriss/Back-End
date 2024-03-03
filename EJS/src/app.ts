import express from 'express';
import ejs from 'ejs';
import path from 'path';
import bodyParser from 'body-parser';

const server = express();
const PORT = 9000

server.use(express.static("public"));
server.use(bodyParser.json());
server.set("views", "ejs");
server.set("views", path.join(__dirname,"views"));

server.get('/', (req:express.Request, res: express.Response) => {
    res.send("hello world")
})

server.listen(PORT, () => console.log(`http://localhost:${PORT} SERVER OK FEN`))