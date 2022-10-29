import {FC} from "react";


import s from "./index.module.scss";
import Image from "next/image";

export const FileInput: FC<{ changeFun: any, name: string, labelText: string }> = ({
                                                                                       changeFun,
                                                                                       name,
                                                                                       labelText
                                                                                   }): JSX.Element => {
    return <>
        <label className={s.label_file} htmlFor={"label_input"}>
            <span> {labelText} </span>
            <Image
                src={"/images/button/download.svg"}
                alt={"download"} width={20}
                height={20}/>
        </label>
        <input type={"file"}
               id={"label_input"}
               className={s.file_input}
               onChange={changeFun}
               name={name}/>
    </>;
};