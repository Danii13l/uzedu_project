import { FC } from "react";

import s from "./index.module.scss";

export const SubTitle: FC<{ subt: string }> = ({ subt }): JSX.Element => {
    return <h3 className={s.subt}>{subt}</h3>;
};