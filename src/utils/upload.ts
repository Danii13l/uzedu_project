import fs from "fs";
import path from "path";
export const uploadImage = async (file: any) => {
  // const imagePath = file.filepath;
  // const mimetype = file.mimetype.split('/');
  // const data = fs.readFileSync(path.resolve(__dirname, imagePath));
  const imagePath = file.filepath;
  const mimetype = file.mimetype.split("/");
  const pathToWriteImage = `public/${file.newFilename}.${mimetype[1]}`;

  const data = fs.readFileSync(path.resolve(__dirname, imagePath));

  fs.writeFileSync(pathToWriteImage, data);
  await fs.unlinkSync(path.resolve(__dirname, imagePath));
  return `/${file.newFilename}.${mimetype[1]}`;
};

export const RemoveImage = async (path: string) => {
  try {
    await fs.unlinkSync(path);
  } catch (error: any) {
    console.log("HI er", error.message);
  }
};
