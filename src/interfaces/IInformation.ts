import { IInformationType } from "./IInformationType";

export interface IInformation {
  type: IInformationType;
  title: string;
  titleRu: string;
  titleUz: string;
  description: string;
  descriptionRu: string;
  descriptionUz: string;
  url: string;
}
