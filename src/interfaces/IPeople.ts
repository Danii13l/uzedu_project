import { IDuty } from "./IDuty";
import { IWorkHistory } from "./IWorkHistory";

export interface IPeople {
  type: "LEADES" | "APP";
  name: string;
  nameRu: string;
  nameUz: string;
  position: string;
  positionUz: string;
  positionRu: string;
  workHours: string;
  workHoursRu: string;
  workHoursUZ: string;
  phone: string;
  email: string;
  tg: string;
  biography: string;
  workHistory: IWorkHistory[];
  duty: IDuty[];
  isBoss: boolean;
  url: string;
}
