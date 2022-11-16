// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import {
  getEnVidoQuery,
  getRuVidoQuery,
  getUzVideoQuery,
  getVideoQuery,
} from "src/db/queries/video";
const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .get(async (req, res) => {
    try {
      const { lang } = req.query;
      let pages: any = await excuteQuery({
        query:
          lang === "ru"
            ? getRuVidoQuery
            : lang === "uz"
            ? getUzVideoQuery
            : lang === "en"
            ? getEnVidoQuery
            : getVideoQuery,
        values: [],
      });
      await pages.map(async (p: any) => {
        p.links = JSON.parse(p.links);
      });
      res.status(200).json({
        pages,
      });
    } catch (err: any) {
      res.status(500).json({ message: err });
      return;
    }
  });
export default handler;
