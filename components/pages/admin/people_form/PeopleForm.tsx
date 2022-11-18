import { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import s from "./index.module.scss";

import { Field, FieldArray, Form, Formik } from "formik";

import { FormActions } from "@/components/pages/admin/form_items/FormActions";
import { InputsBlockMain } from "@/components/pages/admin/form_items/InputsBlockMain";
import { InputsWrapper } from "@/components/pages/admin/form_items/InputsWrapper";
import { FieldArrayWrapper } from "@/components/pages/admin/form_items/FieldArrayWrapper";
import { InputsBlock } from "@/components/pages/admin/form_items/InputsBlock";
import { Button } from "@/components/common/button/Button";
import { PreviewImage } from "@/components/pages/admin/form_items/PreviewImage";
import { InputsFormik } from "@/components/common/input/InputsFormik";
import { FormWrapper } from "@/components/pages/admin/form_items/FormWrapper";
import { myAxios } from 'assets/axios/myAxios';

export const PeopleForm: FC<{ id?: string; type?: string }> = ({ id, type }): JSX.Element => {
    const { query: { slug }, push } = useRouter();


    const [dataOut, setDataOut] = useState<{
        name: string;
        name_ru: string;
        name_uz: string;
        position: string;
        position_uz: string;
        position_ru: string;
        work_hours: string;
        work_hours_ru: string;
        work_hours_uz: string;
        phone: string;
        email: string;
        tg: string;
        biography: string;
        workHistory: string[];
        duty: string[];
        isBoss: number;
        is_boss: number;
        url: string;
        id: number;
        type: string
    } | null>(null);

    useEffect(() => {


        (async function () {
            try {
                const { data } = await myAxios(`/api/dashboard/people/${id}?lang=`);
                setDataOut(data);
            } catch (err) {
                console.log(err);
            }
        }());


    }, []);


    console.log("data", dataOut)

    return (
        <FormWrapper>

            <FormActions isDelete={true} data={dataOut} typeOfPage={"Должностное лицо"} />
            <Formik
                initialValues={{
                    type: dataOut?.type ?? type?.toUpperCase(),
                    name: dataOut?.name ?? "",
                    nameRu: dataOut?.name_ru ?? "",
                    nameUz: dataOut?.name_uz ?? "",
                    position: dataOut?.position ?? "",
                    positionUz: dataOut?.position_uz ?? "",
                    positionRu: dataOut?.position_ru ?? "",
                    workHours: dataOut?.work_hours ?? "",
                    workHoursRu: dataOut?.work_hours_ru ?? "",
                    workHoursUz: dataOut?.work_hours_uz ?? "",
                    phone: dataOut?.phone ?? "",
                    email: dataOut?.email ?? "",
                    tg: dataOut?.tg ?? "",
                    biography: dataOut?.biography ?? "",
                    workHistory: dataOut?.workHistory ?? [],
                    duty: dataOut?.duty ?? [],
                    isBoss: dataOut?.is_boss === 1,
                    image: dataOut?.url ?? null,
                }}
                enableReinitialize={true}
                onSubmit={async (val) => {
                    try {
                        // const formData = new FormData();
                        // dataOut?.id && formData.append("id", dataOut?.id as any);
                        // @ts-ignore
                        // for (let key in val) formData.append(key, val[key]);
                        // const { data } = await myAxios.post("/api/dashboard/people", formData);
                        console.log(val);
                        // push("/admin");
                    } catch (err) {
                        console.log(err);
                    }
                }}

            >
                {({ values, setFieldValue, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>

                        <InputsBlockMain title={"Имя"} arr={["nameRu", "nameUz", "name"]} />
                        <InputsBlockMain title={"Должность"}
                            arr={["positionRu", "positionUz", "position",]} />
                        <InputsBlockMain title={"Рабочие часы"} arr={["workHoursRu", "workHoursUz", "workHours"]} />

                        <InputsWrapper title={"Телефон"}>
                            <InputsFormik name={`phone`} label={""} />
                        </InputsWrapper>
                        <InputsWrapper title={"Email"}> <InputsFormik name={`email`} label={""} /></InputsWrapper>
                        <InputsWrapper title={"Телеграм"}> <InputsFormik name={`tg`} label={""} /></InputsWrapper>


                        <InputsWrapper title={"Биография"}>
                            <InputsFormik name={`biography`} label={""} textarea={true} />
                        </InputsWrapper>

                        {/* <InputsWrapper title={"Трудовая Деятельность"}>
                            <FieldArray
                                name="workHistory"
                                render={({ push, remove }) => (
                                    <div>
                                        {values?.workHistory?.map((video, index) => (
                                            <div key={index} className={s.fieldArray_wr}>
                                                <FieldArrayWrapper deleteFun={() => remove(index)}>
                                                    <InputsBlock index={index} type={"workHistory"} title={"Текст"}
                                                        value={["text", "textRu", "textUz"]} />
                                                </FieldArrayWrapper>
                                            </div>
                                        ))}

                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push({ text: "", textRu: "", textUz: "" })}>
                                            <Button classN={"main"}>Добавить Деятельность</Button>
                                        </div>
                                    </div>
                                )}
                            />
                        </InputsWrapper> */}

                        {/* <InputsWrapper title={"Обязанности"}>
                            <FieldArray
                                name="duty"
                                render={({ push, remove }) => (
                                    <div>
                                        {values?.duty?.map((video, index) => (
                                            <div key={index} className={s.fieldArray_wr}>
                                                <FieldArrayWrapper deleteFun={() => remove(index)}>
                                                    <InputsBlock index={index} type={"duty"} title={"Текст"}
                                                        value={["text", "textRu", "textUz"]} />
                                                </FieldArrayWrapper>
                                            </div>
                                        ))}

                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push({ text: "", textRu: "", textUz: "" })}>
                                            <Button classN={"main"}>Добавить Обязанность</Button>
                                        </div>
                                    </div>
                                )}
                            />
                        </InputsWrapper> */}

                        <InputsWrapper title={"Фотография"}>
                            <PreviewImage condit={values?.image}
                                imgUrl={values?.image}
                                valueToDelete={values?.image}
                                formikSetFun={setFieldValue}
                                valueToSave={"image"}
                                isToUpload={true}
                            />
                        </InputsWrapper>

                        <InputsWrapper title={"Должность"}>
                            <div className={s.isBoss}>
                                <p>Министр ?</p>
                                <Field name={"isBoss"} type={"checkbox"} className={"input_checkbox"} checked={values?.isBoss} />
                            </div>

                        </InputsWrapper>

                        <div className={s.submit}>
                            <Button classN={"main"} submit={true}>Отправить</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
};