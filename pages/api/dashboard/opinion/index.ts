// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { addOpinion, getEnOpinionQuery, getOpinionByIdQuery, getOpinionQuery, getRuOpinionQuery, getUzOpinionQuery, updateOpinion } from "src/db/queries/opinion";
import { IOpinoin } from "src/interfaces/IOpinion";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      const { lang } = req.query;
      let query  =
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
  })
  .post(async (req, res) => {
    try {
      const { ...resource }:IOpinoin = req.body;
      await excuteQuery({
        query: addOpinion,
        values: [
          resource.title,
          resource.titleRu,
          resource.titleUz,
          resource.subtitle,
          resource.subtitleRu,
          resource.subtitleUz,
          resource.text,
          resource.textRu,
          resource.textUz
        ],
      });
      return res.status(200).json({ message: "was successfully added" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  })
  .patch(async (req, res) => {
    try {
     
      const { ...resource }:IOpinoin = req.body;
      let data: any = await excuteQuery({
        query: getOpinionByIdQuery,
        values: [resource.id],
      });

      if (data.length === 0) {
        return res.status(404).end("Opinoin not found");
      }


      await excuteQuery({
        query: updateOpinion,
        values: [
            resource.title,
            resource.titleRu,
            resource.titleUz,
            resource.subtitle,
            resource.subtitleRu,
            resource.subtitleUz,
            resource.text,
            resource.textRu,
            resource.textUz,
            resource.id,
        ],
      });
      return res.status(200).json({ message: "was successfully edited" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
