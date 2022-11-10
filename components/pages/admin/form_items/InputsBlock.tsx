import {FC} from "react";
import {InputsFormik} from "@/components/common/input/InputsFormik";

export const InputsBlock: FC<{ index: number; type: string; value: string[]; title: string }> = ({
                                                                                                   index,
                                                                                                   type,
                                                                                                   title,
                                                                                                   value
                                                                                               }): JSX.Element => {
    return <>
        <InputsFormik name={`${type}[${index}].${value[0]}`}
                      label={`${title} на английском`}/>
        <InputsFormik name={`${type}[${index}].${value[1]}`}
                      label={`${title} на русском`}/>
        <InputsFormik name={`${type}[${index}].${value[2]}`}
                      label={`${title} на узбекском`}/>
    </>;
};