// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { enInformationQuery, fullInformationQuery, informationTypeCountQuery, ruInformationQuery, uzInformationQuery } from "src/db/queries/information";
const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
  
    const { page=1, limit=20, lang, type } = req.query;
    const count: any = await excuteQuery({
      query: informationTypeCountQuery,values:[type]
    });
    const query =
    lang === "ru"
      ? ruInformationQuery
      : lang === "uz"
      ? uzInformationQuery
      : lang === "en"
      ? enInformationQuery
      : fullInformationQuery;
   const data = await excuteQuery({
      query: query,values:[type, Number(limit), (+page - 1) * Number(limit)]
    });
    res.json({
      data,
      totalPages: Math.ceil(count[0].value / Number(limit)),
      currentPage: page,
  });
  } catch (err: any) {
    res.status(500).json({ message: err });
    return;
  }
});

export default handler;
