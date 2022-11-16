// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { enInformationQuery, fullInformationQuery, ruInformationQuery, uzInformationQuery } from "src/db/queries/information";
const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const { lang, type } = req.query;
    const query =
    lang === "ru"
      ? ruInformationQuery
      : lang === "uz"
      ? uzInformationQuery
      : lang === "en"
      ? enInformationQuery
      : fullInformationQuery;
   const data = await excuteQuery({
      query: query,values:[type]
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
