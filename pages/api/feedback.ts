// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { mailer } from 'src/configs/mailer.config';
import { message } from 'src/utils/email';
const handler = nc<NextApiRequest, NextApiResponse>();
handler.post(async (req, res) => {
    try {
        const { name, phone, email, question } = req.body;
        const emailMessage = message(name, phone, email, question);
        mailer(emailMessage);
        res.status(200).json({ "message": "succesfuly" });
    } catch (error) {
        res.status(500).json({ message: error });
        return;
    }
});
export default handler;
