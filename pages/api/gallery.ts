// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import {
  enQuery,
  ruQuery,
  uzQuery,
} from "src/db/queries/gallery";
const handler = nc<NextApiRequest, NextApiResponse>();
handler.get(async (req, res) => {
  const { lang } = req.query;
  try {
    let galleries: any = await excuteQuery({
      query: lang === "ru" ? ruQuery : lang === "uz" ? uzQuery : enQuery,
    });
    if(galleries.length === 0){
        res.status(200).json([]);
    }
    galleries = JSON.parse(JSON.stringify(galleries));
    galleries.map((p: any) => {
        p.images = JSON.parse(p.images);
      });
    res.status(200).json(galleries);
  } catch (err:any) {    
    res.status(500).json({ message: err.message });
    return;
  }
});

export default handler;
