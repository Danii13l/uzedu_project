import {FC} from "react";
import {useRouter} from "next/router";

import s from './index.module.scss';


import {TextInput} from "@/components/common/input/TextInput";
import {Button} from "@/components/common/button/Button";
import {PasswordInput} from "@/components/common/input/PasswordInput";

import * as yup from "yup";
import {useFormik} from "formik";

import {myAxios} from "assets/axios/myAxios";

import Cookies from 'js-cookie';


export const LoginPage: FC = (): JSX.Element => {
    const {push} = useRouter();


    const formik = useFormik({
        initialValues: {
            login: "",
            password: ""
        },
        validationSchema: yup.object().shape({
            login: yup
                .string()
                .required(`Обязательное поле`),
            password: yup
                .string()
                .required(`Обязательное поле`),
        }),
        onSubmit: async (values) => {
            try {
                const {data} = await myAxios.post("/api/login", values)
                await Cookies.set("userInfo", data?.token)
                await push('/admin')
            } catch (err) {
                formik.setErrors({"login": "Неверный пароль или логин", "password": "Неверный пароль или логин"},)
            }

        },
    });
    return <div className={s.login}>
        <form className={s.form} onSubmit={formik.handleSubmit}>
            <h2 className={s.title}>Авторизация</h2>

            <div className={s.input_wr}>
                <TextInput
                    labelText={"Логин"}
                    name="login"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isError={formik.errors.login}
                    isTouched={formik.touched.login}
                    value={formik.values.login}
                />

            </div>

            <PasswordInput labelText={"Пароль"}
                           name="password"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           isError={formik.errors.password}
                           isTouched={formik.touched.password}
                           value={formik.values.password}/>


            <div className={s.submit}>
                <Button classN={"main"} submit={true}>Отправить</Button>
            </div>
        </form>
    </div>
}