// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { deleteVidoById, getVideoByIdQuery } from "src/db/queries/video";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      const id = req.query.id;
      let pages: any = await excuteQuery({
        query: getVideoByIdQuery,
        values: [id],
      });
      await pages.map(async (p: any) => {
        p.links = JSON.parse(p.links);
      });
      if (pages.length === 0) {
        return res.status(404).end("Page not found");
      }
      const page = pages[0];

      res.status(200).json({
        page,
      });
    } catch (err: any) {
      res.status(500).json({ message: err });
      return;
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.query.id;
      let pages: any = await excuteQuery({
        query: getVideoByIdQuery,
        values: [id],
      });
      if (pages.length === 0) {
        return res.status(404).end("Page not found");
      }
      await excuteQuery({
        query: deleteVidoById,
        values: [id],
      });
      return res.status(200).json({ message: "was successfully removed" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
