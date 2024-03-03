import express, { urlencoded } from "express";
import path from "path";
import upload from "./configs/multer.config";
import uploadCloud from "./configs/multerCloud.config";

import routers from "./routers/index.router";
const server = express();
const PORT = 9000;

server.use(express.static("public"));
server.use(urlencoded());
// Phần upload file không dùng cloudinary

// server.post('/', upload.single('file'), (req: express.Request, res: express.Response) => {
//     const file = req.file as Express.Multer.File;
//     if (!file) {
//         return res.status(404).send('File not uploaded');
//     }
//     const relativePath = path.join('/images/',file.filename);
//     const directUrl = `http://localhost:${PORT}${relativePath}`
//     res.status(200).json(directUrl)
// })

// server.post('/uploads', upload.array('files',5), (req: express.Request, res: express.Response) => {
//     const uploadedFiles = req.files as Express.Multer.File[];

//     const filePaths = uploadedFiles.map(file => {
//         const relativePath = path.join('/images/',file.filename);
//         const directUrl = `http://localhost:${PORT}${relativePath}`
//         return directUrl
//     })
//     res.status(200).json(filePaths)
// })

// server.get('images/:filename', (req:express.Request, res:express.Response) => {
//     const filename = req.params.filename;
//     const publicFolder = path.join(__dirname,'public')
//     const filePath = path.join(publicFolder,'images',filename);
//     res.sendFile(filePath)
// })

// Phần uplaod dùng cloudinary
server
  .post(
    "/",
    uploadCloud.single("file"),
    (req: express.Request, res: express.Response) => {
      const file = req.file as Express.Multer.File;
      res.json(file);
    }
  )
  .post(
    "/uploads",
    uploadCloud.array("files", 10),
    (req: express.Request, res: express.Response) => {
      const file = req.files as Express.Multer.File[];
      const fileNeed = file.map((item: Express.Multer.File) => {
        return item.path;
      });
      console.log(123);
      
      res.json(fileNeed);
    }
  );




routers(server)
server.listen(PORT, () =>
  console.log(`http://localhost:${PORT} SERVER OK FENNN`)
);
