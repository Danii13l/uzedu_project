import { FormType } from "./IFormType";

export interface ISubMenu{
    id:number;
    menuId?:number;
    name:string;
    typeOfForm:FormType;
}