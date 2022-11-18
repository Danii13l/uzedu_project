// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { getEnOpinionQuery, getOpinionQuery, getRuOpinionQuery, getUzOpinionQuery } from "src/db/queries/opinion";

const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .get(async (req, res) => {
    try {
      const { lang } = req.query;
      let query =
        lang === "ru"
          ? getRuOpinionQuery
          : lang === "uz"
            ? getUzOpinionQuery
            : lang === "en"
              ? getEnOpinionQuery
              : getOpinionQuery;
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
