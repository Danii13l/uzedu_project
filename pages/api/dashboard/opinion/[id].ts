// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();
import { deleteOpinionById, getOpinionByIdQuery } from "src/db/queries/opinion";

handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      const id = req.query.id;
      let data: any = await excuteQuery({
        query: getOpinionByIdQuery,
        values: [id],
      });
      if (data.length === 0) {
        return res.status(404).end("Opinion not found");
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
      let opinion: any = await excuteQuery({
        query: getOpinionByIdQuery,
        values: [id],
      });
      if (opinion.length === 0) {
        return res.status(404).end("Page not found");
      }

      await excuteQuery({
        query: deleteOpinionById,
        values: [id],
      });
      return res.status(200).json({ message: "was successfully removed" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
