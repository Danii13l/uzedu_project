// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';



import bcrypt from 'bcryptjs';
import { IUser } from 'src/interfaces/IUser';
import excuteQuery from 'src/db/mydb';
import { signToken } from 'src/utils/auth';
const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
    try {
        const { login, password } = req.body;
        let userData: any = await excuteQuery({
            query: 'SELECT id, name, password FROM users where name = ? ',
            values: [login],
        });
        if (userData.length === 0) {
            return res.status(404).end('Tour not found');
        }
        const user: IUser = userData[0];
        if (user && bcrypt.compareSync(password, user.password)) { 
            const token = signToken(user);
            res.send({
                token,
            });
        } else {
            res.status(401).send({ message: 'Invalid user or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
        return;
    }
});

export default handler;
