import React, {FC} from "react";
import s from "./index.module.scss";

export const FormWrapper: FC<{ children: React.ReactNode }> = ({children}): JSX.Element => {
    return <div className={s.form}>
        {children}
    </div>;
};