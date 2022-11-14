import { IImage } from "./IImage";
import { IMultipartType } from "./IMultipartType";

export interface IMultipart{
    id?: number;
    type: IMultipartType;
    title: string;
    titleRu: string;
    titleUz: string;
    description: string;
    descriptionRu: string;
    descriptionUz: string;
    pupils: string | null,
    teachers: string  | null,
    barkamol: string  | null,
    houses: string | null,
    school: string  | null,
    link: string,
    image: IImage | null;
    images: IImage[];
}