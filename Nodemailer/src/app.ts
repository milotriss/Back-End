import express from 'express';
import transporter from './configs/nodemailer.config';


const app = express();
const PORT = 9000

app.get('/send', async (req:express.Request, res:express.Response) => {
    try {
        await transporter.sendMail({
            to: '',
            subject:'',
            html: '',
        })
        res.json("Send mail successfully")
    } catch (error) {
        res.json("Send mail failed")
    }
})
app.listen(PORT, () => console.log(`http://localhost:${PORT} SERVER OK FEN`));