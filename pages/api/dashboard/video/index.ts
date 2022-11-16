// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import {
  addVideo,
  getEnVidoQuery,
  getRuVidoQuery,
  getUzVideoQuery,
  getVideoByIdQuery,
  getVideoQuery,
  updateVideo,
} from "src/db/queries/video";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();

handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      const { lang } = req.query;
      let pages: any = await excuteQuery({
        query:
          lang === "ru"
            ? getRuVidoQuery
            : lang === "uz"
            ? getUzVideoQuery
            : lang === "en"
            ? getEnVidoQuery
            : getVideoQuery,
        values: [],
      });
      await pages.map(async (p: any) => {
        p.links = JSON.parse(p.links);
      });
      res.status(200).json({
        pages,
      });
    } catch (err: any) {
      res.status(500).json({ message: err });
      return;
    }
  })
  .post(async (req, res) => {
    const {
      title,
      titleRu,
      titleUz,
      description,
      descriptionRu,
      descriptionUz,
      links,
    } = req.body;
    try {
      await excuteQuery({
        query: addVideo,
        values: [
          title,
          titleRu,
          titleUz,
          description,
          descriptionRu,
          descriptionUz,
          JSON.stringify(links),
        ],
      });
      return res.status(200).json({ message: "was successfully added" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  })
  .put(async (req, res) => {
    const {
      id,
      title,
      titleRu,
      titleUz,
      description,
      descriptionRu,
      descriptionUz,
      links,
    } = req.body;
    try {
      let pages: any = await excuteQuery({
        query: getVideoByIdQuery,
        values: [id],
      });
      if (pages.length === 0) {
        return res.status(404).end("Page not found");
      }
      await excuteQuery({
        query: updateVideo,
        values: [
          id,
          title,
          titleRu,
          titleUz,
          description,
          descriptionRu,
          descriptionUz,
          links,
          id,
        ],
      });
      return res.status(200).json({ message: "was successfully edited" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
