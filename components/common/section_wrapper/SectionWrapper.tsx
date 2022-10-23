import React, {FC} from "react";


import s from "./index.module.scss";


export const SectionWrapper: FC<{ children: React.ReactNode }> = ({children}): JSX.Element => {
    return <div className={s.section}>{children}</div>
}