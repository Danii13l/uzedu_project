import { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm } from "formidable";
import { IImage } from "src/interfaces/IImage";
import { uploadImage } from "./upload";

export const formidableHelper = async (req:NextApiRequest, res:NextApiResponse) => {
    const form = formidable({ multiples: true });
    const imagesURLArray: IImage[] = [];
    const data: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const {images} = data.files;
    let arr = Object.keys(images).map((k) => images[k]);
    if (arr.length > 0) {
      for (let index = 0; index < arr.length; index++) {
        const imagePath = await uploadImage(arr[index]);
        imagesURLArray.push({ url: imagePath, id: index + 1 });
      }
    }
    return JSON.stringify(imagesURLArray);
}