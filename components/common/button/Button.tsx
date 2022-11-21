import { FC } from "react";

import s from './index.module.scss';
import Image from "next/image";

export const Button: FC<{ classN: string, children: React.ReactNode, submit?: boolean }> = ({
    classN,
    submit,
    children
}): JSX.Element => {
    return <button type={submit ? "submit" : "button"} className={`${s.button} ${s[classN]}`}>{children}
        {classN === "third" && <span>
            <Image src={"/images/button/arrow_button.svg"} layout={"fill"} alt="arr" />
        </span>}

    </button>;
};