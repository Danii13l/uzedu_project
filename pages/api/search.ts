// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import {
  enInformationSearchQuery,
  ruInformationSearchQuery,
  uzInformationSearchQuery,
} from "src/db/queries/search";
const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const { lang, text } = req.query;
      const query =
        lang === "ru"
          ? ruInformationSearchQuery(String(text))
          : lang === "uz"
          ? uzInformationSearchQuery(String(text))
          : enInformationSearchQuery(String(text));
      const data = await excuteQuery({
        query: query,
      });
      res.status(200).json({
        data,
      });
  } catch (err: any) {
    res.status(500).json({ message: err });
    return;
  }
});

export default handler;
