// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();
import {
  createPage,
  getById,
  getEnPageQuery,
  getPageQuery,
  getRuPageQuery,
  getUzPageQuery,
  updatePage,
} from "src/db/queries/page";

handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      const { lang, menuId, subMenuId } = req.query;
      let pages: any = await excuteQuery({
        query:
          lang === "ru"
            ? getRuPageQuery
            : lang === "uz"
            ? getUzPageQuery
            : lang === "en"
            ? getEnPageQuery
            : getPageQuery,
        values: [menuId, subMenuId],
      });
      await pages.map(async (p: any) => {
        p.images = JSON.parse(p.images);
        p.videos = JSON.parse(p.videos);
        p.files = JSON.parse(p.files);
      });

      const page = pages[0];
      for (const image of page.images) {
        if (image.title && lang) {
          image.title = lang === "ru" ? image.titleRu : image.titleUz;
          delete image.titleRu;
          delete image.titleUz;
        }
      }
      for (const video of page.videos) {
        if (video.title && lang) {
          video.title = lang === "ru" ? video.titleRu : video.titleUz;
          delete video.titleRu;
          delete video.titleUz;
        }
      }
      for (const file of page.files) {
        if (file.title && lang) {
          file.title = lang === "ru" ? file.titleRu : file.titleUz;
          delete file.titleRu;
          delete file.titleUz;
        }
      }

      res.status(200).json({
        page,
      });
    } catch (err: any) {
      console.log(err.message);

      res.status(500).json({ message: err });
      return;
    }
  })
  .post(async (req, res) => {
    const {
      menuId,
      subMenuId,
      title,
      titleRu,
      titleUz,
      description,
      descriptionRu,
      descriptionUz,
      images,
      videos,
      files,
    } = req.body;
    try {
      await excuteQuery({
        query: createPage,
        values: [
          menuId,
          subMenuId,
          title,
          titleRu,
          titleUz,
          description,
          descriptionRu,
          descriptionUz,
          JSON.stringify(images),
          JSON.stringify(videos),
          JSON.stringify(files),
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
      images,
      videos,
      files,
    } = req.body;
    try { 
      let pages: any = await excuteQuery({
        query: getById,
        values: [id],
      });


      if (pages.length === 0) {
        return res.status(404).end("Page not found");
      }
      await excuteQuery({
        query: updatePage,
        values: [
          title,
          titleRu,
          titleUz,
          description,
          descriptionRu,
          descriptionUz,
          JSON.stringify(images),
          JSON.stringify(videos),
          JSON.stringify(files),
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
