import * as yup from "yup";

export interface ContactUsInt {
    username: string,
    phone: string,
    email: string,
    question: string
}

export const ContactUsSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(2, "Поле должно содержать не менее 2 символов")
        .required(`Обязательное поле`),
    phone: yup
        .string()
        .trim()
        .matches(/\(\d\d\) \d\d\d-\d\d-\d\d/, "Неверный формат")
        .required("Обязательное поле"),
    email: yup.string().email("Неверный формат").required("Обязательное поле"),
    question: yup
        .string()
        .trim()
        .min(10, "Поле должно содержать не менее 10 символов")
        .required(`Обязательное поле`),
});
