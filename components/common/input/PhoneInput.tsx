import { FC } from "react";

import { PatternFormat } from 'react-number-format';

import { InputInt } from "assets/interfaces/inputInterface";

import s from "./index.module.scss";

export const PhoneInput: FC<InputInt> = ({
    name,
    labelText,
    onChange,
    onBlur,
    isError,
    isTouched,
    value,
}): JSX.Element => {
    return (
        <div>
            {labelText && <label className={s.label}>{labelText}</label>}
            <div className={s.phone_wrapper}>
                <PatternFormat
                    type="tel"
                    format="(##) ###-##-##"
                    mask="_"
                    className={`${s.input} ${isError && isTouched ? s.errorInput : ""
                        }`}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={"__ ___ __ __"}
                    autoComplete="on"
                    value={value}
                />


                <div className={s.number_ex}>998</div>
            </div>
            {isError && isTouched && <p className={s.error}>{isError}</p>}
        </div>
    );
};
