import {FC} from "react";

import s from "./index.module.scss";

export const InputsWrapper: FC<{ children: React.ReactNode,title:string }> = ({children,title}): JSX.Element => {
    return <div className={s.inputs_wrapper}>
        <h4 className={s.inputs_wrapper_title}>{title}</h4>
        {children}
    </div>;
};