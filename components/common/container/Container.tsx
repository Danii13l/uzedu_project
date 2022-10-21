import React, {FC} from "react";

import s from './index.module.scss';

export const Container: FC<{ children: React.ReactNode }> = ({children}): JSX.Element => {
    return <div className={s.container}>{children}</div>
}