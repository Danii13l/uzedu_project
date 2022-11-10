import {FC} from "react";


import s from "./index.module.scss";
import Image from "next/image";

export const FileInput: FC<{ changeFun: any, name: string, labelText: string; isFile?: boolean }> = ({
                                                                                                        changeFun,
                                                                                                        name,
                                                                                                        labelText,
                                                                                                        isFile
                                                                                                    }): JSX.Element => {


    return <>
        <label className={s.label_file} htmlFor={name}>
            <span> {labelText} </span>
            <Image
                src={"/images/button/download.svg"}
                alt={"download"} width={20}
                height={20}/>
        </label>
        <input type={"file"}
               accept={isFile ? "" : "image/png, image/jpeg, image/svg"}
               id={name}
               className={s.file_input}
               onChange={changeFun}
               name={name}/>
    </>;
};