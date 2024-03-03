import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nhattienla98@gmail.com',
        pass: 'wybi oqyw chok mwli'
    }
})

export default transporter;