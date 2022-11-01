import { IDocument } from "./IDocument";
import { IImage } from "./IImage";
import { IVideo } from "./IVideo";

export interface IPage {
  id?: number;
  menuId: number;
  subMenuId: number;
  title: string;
  titleRu: string;
  titleUz: string;
  description: string;
  descriptionRu: string;
  descriptionUz: string;
  images: IImage[];
  videos: IVideo[];
  files: IDocument[];
}
