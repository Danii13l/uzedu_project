// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { deletePeopelById, getAllById } from "src/db/queries/people";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();

import { RemoveImage } from "src/utils/upload";

handler
  .use(isAuth)
  .delete(async (req, res) => {
    try {
      const id = req.query.id;
      let people: any = await excuteQuery({
        query: getAllById,
        values: [id],
      });
      if (people.length === 0) {
        return res.status(404).end("People not found");
      }

      await excuteQuery({
        query: deletePeopelById,
        values: [id],
      }).then(() => {
        if (people[0].url) {
          const url = "public" + people[0].url;
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
      let people: any = await excuteQuery({
        query: getAllById,
        values: [id],
      });
      if (people.length === 0) {
        return res.status(404).end("People not found");
      }

      return res.json(people[0]);
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
