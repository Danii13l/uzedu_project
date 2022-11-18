// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import formidable, { IncomingForm } from "formidable";
import { isAuth } from "src/utils/auth";
import { RemoveImage, uploadImage } from "src/utils/upload";
import { IImage } from "src/interfaces/IImage";
import excuteQuery from "src/db/mydb";

import { IGallery } from "src/interfaces/IGallery";
import {
  addInformationQuery,
  editInformationQuery,
  fullInformationQuery,
  getInformationById,
} from "src/db/queries/information";
const handler = nc<NextApiRequest, NextApiResponse>();
export const config = {
  api: {
    bodyParser: false,
  },
};
handler
  .use(isAuth)
  .get(async (req, res) => {
    const { type } = req.query;
    try {
      let information: any = await excuteQuery({
        query: fullInformationQuery,values:[type]
      });

      res.status(200).json(information);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
      return;
    }
  })
  .post(async (req, res) => {
    try {
      const form = formidable({ multiples: true });
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
      const { image } = data.files;
      if (!image) {
        return res.status(400).json({ message: "image required" });
      }
      const imagePath = await uploadImage(image);
      const {
        type,
        title,
        titleRu,
        titleUz,
        description,
        descriptionRu,
        descriptionUz,
      } = data.fields;
      await excuteQuery({
        query: addInformationQuery,
        values: [
          type,
          title,
          titleRu,
          titleUz,
          description,
          descriptionRu,
          descriptionUz,
          imagePath,
        ],
      });
      return res.status(200).json({ message: "was successfully added" });
    } catch (error: any) {
      res.status(500).json({ message: error });
      return;
    }
  })
  .put(async (req, res) => {
    const data: any = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    try {
      const { image } = data.files;
      const {
        id,
        title,
        titleRu,
        titleUz,
        description,
        descriptionRu,
        descriptionUz,
      } = data.fields;
      let information: any = await excuteQuery({
        query: getInformationById,
        values: [id],
      });
      if (information.length === 0) {
        return res.status(404).end("Gallery not found");
      }
      let imagePath = information[0].url; 
      if (image) {
        const url = "public" + imagePath;
        RemoveImage(url);
        imagePath = await uploadImage(image);
      }

      await excuteQuery({
        query: editInformationQuery,
        values: [
          title,
          titleRu,
          titleUz,
          description,
          descriptionRu,
          descriptionUz,
          imagePath,
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
