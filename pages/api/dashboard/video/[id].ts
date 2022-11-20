// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import {
  deleteInformationById,
  getInformationById,
} from "src/db/queries/information";
import { deleteVidoById, getVideoByIdQuery } from "src/db/queries/video";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();

import { RemoveImage } from "src/utils/upload";

handler
  .use(isAuth)
  .delete(async (req, res) => {
    try {
      const id = req.query.id;
      let video: any = await excuteQuery({
        query: getVideoByIdQuery,
        values: [id],
      });
      if (video.length === 0) {
        return res.status(404).end("Video not found");
      }

      await excuteQuery({
        query: deleteVidoById,
        values: [id],
      }).then(() => {
        if (video[0].url) {
          const url = "public" + video[0].url;
          RemoveImage(url);
        }
      });
      return res.status(200).json({ message: "was successfully removed" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  })
  .get(async (req, res) => {
    try {
      const id = req.query.id;
      let info: any = await excuteQuery({
        query: getVideoByIdQuery,
        values: [id],
      });
      if (info.length === 0) {
        return res.status(404).end("Galary not found");
      }

      return res.json(info[0]);
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
