import { FormType } from "./IFormType";

export interface ISubMenu{
    id:number;
    menuId?:number;
    name:string;
    pageLink:string;
    typeOfForm:FormType;
}