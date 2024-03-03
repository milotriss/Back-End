import * as nodemailer from 'nodemailer';
import {config} from 'dotenv';
config();
export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.MAIL_MAIN,
        pass:process.env.MAIL_PASS
    }
})


// Cú pháp để gởi mail

// app.get('/send', async (req:express.Request, res:express.Response) => {
//     try {
//         await transporter.sendMail({
//             bcc: '',
//             subject:'',
//             html: '',
//         })
//         res.json("Send mail successfully")
//     } catch (error) {
//         res.json("Send mail failed")
//     }
// })