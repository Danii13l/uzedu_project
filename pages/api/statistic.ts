// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import {
  getAllStatistics,
} from "src/db/queries/statistic";
const handler = nc<NextApiRequest, NextApiResponse>();
handler.get(async (req, res) => {
  try {
    const data = await excuteQuery({
      query: getAllStatistics,
    });
    const statistic = data[0]
    res.status(200).json({
      statistic,
    });
  } catch (err: any) {
    res.status(500).json({ message: err });
    return;
  }
});

export default handler;
