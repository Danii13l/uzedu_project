// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();
import { RemoveImage } from "src/utils/upload";
import {
  deleteById,
  getByIdQuery,
} from "src/db/queries/multipart";


handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      const id = req.query.id;
      let data: any = await excuteQuery({
        query: getByIdQuery,
        values: [id],
      });
      if (data.length === 0) {
        return res.status(404).end("Multipart not found");
      }
      const result = data[0];
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ message: err });
      return;
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.query.id;
      let multipart: any = await excuteQuery({
        query: getByIdQuery,
        values: [id],
      });
      if (multipart.length === 0) {
        return res.status(404).end("Page not found");
      }

      await excuteQuery({
        query: deleteById,
        values: [id],
      }).then(() => {
        const url = "public" + multipart[0].url;
        RemoveImage(url);
      });
      return res.status(200).json({ message: "was successfully removed" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
