import {FC} from "react";
import {InputsFormik} from "@/components/common/input/InputsFormik";

import s from "./index.module.scss";

import {languagesPageForm} from "assets/constants/pageForm";

import {InputsWrapper} from "@/components/pages/admin/form_items/InputsWrapper";

export const InputsBlockMain: FC<{ title: string | null; arr: string[], textarea?: boolean }> = ({
                                                                                                     title,
                                                                                                     arr,
                                                                                                     textarea
                                                                                                 }): JSX.Element => {
    return <InputsWrapper title={title ? title : ""}>
        {
            [...arr].map((item, i) => {
                return <div key={i} className={s.input_wrapper}>
                    <InputsFormik name={item} label={languagesPageForm[i]} textarea={textarea}/>
                </div>;
            })
        }
    </InputsWrapper>;


};