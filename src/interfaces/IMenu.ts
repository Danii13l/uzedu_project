import {ISubMenu} from "./ISubMenu";

export interface IMenu{
    id:number;
    name:string;
    subMenu:ISubMenu[];
}