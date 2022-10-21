import {FC} from "react";

import s from './index.module.scss';
import Image from "next/image";

export const Button: FC<{ classN: string, children: React.ReactNode }> = ({classN, children}): JSX.Element => {
    return <button className={`${s.button} ${s[classN]}`}>{children}
        {classN ==="third" &&  <span>
            <Image src={"/images/button/arrow_button.svg"} layout={"fill"}/>
       </span>}

    </button>
}