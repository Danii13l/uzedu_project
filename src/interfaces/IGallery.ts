import { IImage } from "./IImage";

export interface IGallery {
  id: number;
  title: string;
  titleRu: string;
  titleUz: string;
  description: string;
  descriptionRu: string;
  descriptionUz: string;
  images: IImage[];
}
