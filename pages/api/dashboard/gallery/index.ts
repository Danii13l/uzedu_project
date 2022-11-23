// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import formidable, { IncomingForm } from "formidable";
import { isAuth } from "src/utils/auth";
import { RemoveImage, uploadImage } from "src/utils/upload";
import { IImage } from "src/interfaces/IImage";
import excuteQuery from "src/db/mydb";
import {
  addGalleryQuery,
  editGalleryQuery,
  fullQuery,
} from "src/db/queries/gallery";
import { IGallery } from "src/interfaces/IGallery";
const handler = nc<NextApiRequest, NextApiResponse>();
export const config = {
  api: {
    bodyParser: false,
  },
};
handler
  .use(isAuth)
  .get(async (req, res) => {
    try {
      let galleries: any = await excuteQuery({
        query: fullQuery,
      });
      if (galleries.length === 0) {
        res.status(200).json([]);
      }
      galleries = JSON.parse(JSON.stringify(galleries));
      galleries.map((p: any) => {
        p.images = JSON.parse(p.images);
      });
      res.status(200).json(galleries);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
      return;
    }
  })
  .post(async (req, res) => {
    try {
      const form = formidable({ multiples: true });
      const imagesURLArray: IImage[] = [];
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
      const { images } = data.files;
      if (!images) {
        return res.status(400).json({ message: "image required" });
      }
      if(Array.isArray(images)){
        let arr = Object.keys(images).map((k:any) => images[k]);
        if (arr.length > 0) {
          for (let index = 0; index < arr.length; index++) {
            const imagePath = await uploadImage(arr[index]);
            imagesURLArray.push({ url: imagePath, id: index + 1 });
          }
        }
      }else{
        const imagePath = await uploadImage(images);
            imagesURLArray.push({ url: imagePath, id: 1 });
      }
      const {
        title,
        titleRu,
        titleUz,
        description,
        descriptionRu,
        descriptionUz,
      } = data.fields;
      await excuteQuery({
        query: addGalleryQuery,
        values: [
          title,
          titleRu,
          titleUz,
          description,
          descriptionRu,
          descriptionUz,
          JSON.stringify(imagesURLArray),
        ],
      });
      return res.status(200).json({ message: "was successfully added" });
    } catch (error: any) {
      res.status(500).json({ message: error });
      return;
    }
  })
  .put(async (req, res) => {
    const form = formidable({ multiples: true });
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
    try {
      const imagesURLArray: IImage[] = [];
      const {images } = data.files;
      const {
        id,
        title,
        titleRu,
        titleUz,
        description,
        descriptionRu,
        descriptionUz,
        images_url,
      } = data.fields;
    
    
     
      
      const query = "SELECT id, images FROM galleries where id = ? ";
      let galleries: any = await excuteQuery({
        query: query,
        values: [id],
      });
      if (galleries.length === 0) {
        return res.status(404).end("Gallery not found");
      }
    
      
      galleries = Object.values(JSON.parse(JSON.stringify(galleries)));
      galleries = JSON.parse(JSON.stringify(galleries));
      galleries.map((p: any) => {
        p.images = JSON.parse(p.images);
      });
    
      const galleriesData: IGallery = galleries[0];
      if(Array.isArray(images)){
        let arr = Object.keys(images).map((k:any) => images[k]);
        if (arr.length > 0) {
          for (let index = 0; index < arr.length; index++) {
            const imagePath = await uploadImage(arr[index]);
            imagesURLArray.push({ url: imagePath, id: index + 1 });
          }
        }
      }else{
        if(images){

          const imagePath = await uploadImage(images);
          imagesURLArray.push({ url: imagePath, id:1 });
        }
      }
      const imagesURL: string[] = images_url.split(","); 
      let counter = imagesURLArray.length;
      let flag = false;
      for (let i = 0; i < galleriesData.images.length; i++) {
        for (let j = 0; j < imagesURL.length; j++) {
          if (galleriesData.images[i].url === imagesURL[i]) {
            flag = true;
          }
        }
        if (flag) {
          flag = false;
          imagesURLArray.push({
            url: galleriesData.images[i].url,
            id: counter + 1,
          });
        } else {
          const url = "public" + galleriesData.images[i].url;
          RemoveImage(url);
        }
      }

      await excuteQuery({
        query: editGalleryQuery,
        values: [
          title,
          titleRu,
          titleUz,
          description,
          descriptionRu,
          descriptionUz,
          JSON.stringify(imagesURLArray),
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
