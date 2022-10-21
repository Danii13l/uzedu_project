import {FC} from "react";

import s from './index.module.scss';


export const Title: FC<{
    heading?: string;
    title: string;
}> = ({
          heading = 'h2',
          title,

      }): JSX.Element => {
    return (
        <>
            {heading === 'h1' ? <h1 className={s.title}>{title}</h1> :
                <h2 className={s.title}>{title}</h2>}
        </>
    );
};