// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import excuteQuery from "src/db/mydb";
import { isAuth } from "src/utils/auth";
const handler = nc<NextApiRequest, NextApiResponse>();
import formidable from "formidable";

import { IImage } from "src/interfaces/IImage";
import { RemoveImage, uploadImage } from "src/utils/upload";
import {
  addMultipartBanner,
  getBannerQuery,
  getByIdQuery,
  getEnBanerQuery,
  getEnLinkQuery,
  getEnSliderQuery,
  getLinkQuery,
  getRuBannerQuery,
  getRuLinkQuery,
  getRuSliderQuery,
  getSliderQuery,
  getUzBannerQuery,
  getUzLinkQuery,
  getUzSliderQuery,
  updateMultipartBanner,
} from "src/db/queries/multipart";
import { IMultipartType } from "src/interfaces/IMultipartType";
export const config = {
  api: {
    bodyParser: false,
  },
};
handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      const { lang, type } = req.query;
      let data = null;
      let query = null;
      switch (type) {
        case IMultipartType.banner:
          query =
            lang === "ru"
              ? getRuBannerQuery
              : lang === "uz"
              ? getUzBannerQuery
              : lang === "en"
              ? getEnBanerQuery
              : getBannerQuery;
          break;
        case IMultipartType.slider:
          query =
            lang === "ru"
              ? getRuSliderQuery
              : lang === "uz"
              ? getUzSliderQuery
              : lang === "en"
              ? getEnSliderQuery
              : getSliderQuery;
          break;
        case IMultipartType.link:
          query =
            lang === "ru"
              ? getRuLinkQuery
              : lang === "uz"
              ? getUzLinkQuery
              : lang === "en"
              ? getEnLinkQuery
              : getLinkQuery;
          break;
        default:
          break;
      }
      data = await excuteQuery({
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
      const form = formidable();
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
      const { image } = data.files;
      const imagePath = await uploadImage(image);

      const { ...resource } = data.fields;
      await excuteQuery({
        query: addMultipartBanner,
        values: [
          resource.type,
          resource.title,
          resource.titleRu,
          resource.titleUz,
          resource.description,
          resource.descriptionRu,
          resource.descriptionUz,
          resource.pupils,
          resource.teachers,
          resource.barkamol,
          resource.houses,
          resource.school,
          resource.link,
          imagePath,
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
      const form = formidable({ multiples: true });
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
      const { ...resource } = data.fields;
      let multipart: any = await excuteQuery({
        query: getByIdQuery,
        values: [resource.id],
      });

      if (multipart.length === 0) {
        return res.status(404).end("Multipart not found");
      }

      const { image } = data.files;
      let imagePath = multipart.image;
      if (image) {
        const url = "public" + imagePath;
        RemoveImage(url);
        imagePath = await uploadImage(image);
      }

      await excuteQuery({
        query: updateMultipartBanner,
        values: [
          resource.type,
          resource.title,
          resource.titleRu,
          resource.titleUz,
          resource.description,
          resource.descriptionRu,
          resource.descriptionUz,
          resource.pupils,
          resource.teachers,
          resource.barkamol,
          resource.houses,
          resource.school,
          resource.link,
          imagePath,
          resource.id,
        ],
      });
      //   let multipartImages = JSON.parse(JSON.stringify(multipart[0].images));
      //   multipartImages = JSON.parse(multipartImages);
      //   if (images.length > 0) {
      //     for (let i = 0; i < multipartImages.length; i++) {
      //       const url = "public" + multipartImages[i].url;
      //       RemoveImage(url);
      //     }
      //   }
      return res.status(200).json({ message: "was successfully edited" });
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
  });

export default handler;
