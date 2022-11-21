// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import {
  getInformationById, getInformationEnById, getInformationRuById, getInformationUzById,
} from "src/db/queries/information";
const handler = nc<NextApiRequest, NextApiResponse>();
handler
  .get(async (req, res) => {
    try {
    const { id, lang } = req.query;
      let info: any = await excuteQuery({
        query:
          lang === "ru"
            ? getInformationRuById
            : lang === "uz"
            ? getInformationUzById
            : lang === "en"
            ? getInformationEnById
            : getInformationById,
        values: [id],
      });
      if (info.length === 0) {
        return res.status(404).end("Info not found");
      }
      return res.json(info[0]);
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
