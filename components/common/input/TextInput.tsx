import {FC} from "react";

import {InputInt} from "assets/interfaces/inputInterface";

import s from "./index.module.scss";

export const TextInput: FC<InputInt> = ({
                                            name,
                                            value,
                                            labelText,
                                            onChange,
                                            onBlur,
                                            isError,
                                            isTouched,
                                            place,
                                            isAdmin
                                        }): JSX.Element => {
    return (
        <div>
            {labelText && <label className={s.label}>{labelText}</label>}
            <input
                type="text"
                name={name}
                className={`${s.input} ${
                    isError && isTouched ? s.errorInput : ""
                }  ${isAdmin ? s.admin : ""}`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="on"
                placeholder={place ? place : ""}
            />
            {isError && isTouched && <p className={s.error}>{isError}</p>}
        </div>
    );
};
