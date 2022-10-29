import {FC} from "react";

import s from "./index.module.scss";


import {Field} from "formik";


export const InputsFormik: FC<{ name: string, label: string, textarea?: boolean }> = ({name, label, textarea}) => {
    return <div>
        <label className={s.label}>{label}</label>
        {
            textarea ? <Field name={name} className={`${s.textarea} ${s.admin}`} as={"textarea"}/> :
                <Field name={name} className={`${s.input} ${s.admin}`}/>
        }

    </div>;
};