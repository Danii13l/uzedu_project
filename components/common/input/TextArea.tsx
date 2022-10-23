import {FC} from "react";

import { InputInt } from "assets/interfaces/inputInterface";

import styles from "./index.module.scss";


export const TextArea: FC<InputInt> = ({
                                           name,
                                           value,
                                           labelText,
                                           onChange,
                                           onBlur,
                                           isError,
                                           isTouched,
                                           place,
                                       }): JSX.Element => {
    return (
        <div>
            {labelText && <label className={styles.label}>{labelText}</label>}

            <textarea
                className={`${styles.textarea} ${
                    isError && isTouched ? styles.errorInput : ""
                }`}
                placeholder={place ? place : "..."}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="on"
                name={name}
            ></textarea>

            {isError && isTouched && <p className={styles.error}>{isError}</p>}
        </div>
    );
};
