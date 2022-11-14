import {FC} from "react";

import {useRouter} from "next/router";

import s from "./index.module.scss";

import {Field, FieldArray, Form, Formik} from "formik";

import {FormActions} from "@/components/pages/admin/form_items/FormActions";
import {InputsBlockMain} from "@/components/pages/admin/form_items/InputsBlockMain";
import {InputsWrapper} from "@/components/pages/admin/form_items/InputsWrapper";
import {FieldArrayWrapper} from "@/components/pages/admin/form_items/FieldArrayWrapper";
import {InputsBlock} from "@/components/pages/admin/form_items/InputsBlock";
import {Button} from "@/components/common/button/Button";
import {PreviewImage} from "@/components/pages/admin/form_items/PreviewImage";
import {InputsFormik} from "@/components/common/input/InputsFormik";
import {FormWrapper} from "@/components/pages/admin/form_items/FormWrapper";

export const PeopleForm: FC = (): JSX.Element => {
    const {query: {slug}, push} = useRouter();

    return (
        <FormWrapper>

            <FormActions data={false} typeOfPage={"Должностное лицо"} deleteType={"должностное лицо"}/>
            <Formik
                initialValues={{
                    name: "",
                    nameRu: "",
                    nameUz: "",
                    position: "",
                    positionUz: "",
                    positionRu: "",
                    workHours: "",
                    workHoursRu: "",
                    workHoursUz: "",
                    phone: "",
                    email: "",
                    tg: "",
                    biography: "",
                    workHistory: [],
                    duty: [],
                    isBoss: false,
                    url: ""
                }}
                enableReinitialize={true}
                onSubmit={async (val) => {
                    console.log(val);
                }}

            >
                {({values, setFieldValue, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>

                        <InputsBlockMain title={"Имя"} arr={["nameRu", "nameUz", "name"]}/>
                        <InputsBlockMain title={"Должность"}
                                         arr={["positionRu", "positionUz", "position",]}/>
                        <InputsBlockMain title={"Рабочие часы"} arr={["workHoursRu", "workHoursUz", "workHours"]}/>

                        <InputsWrapper title={"Телефон"}>
                            <InputsFormik name={`phone`} label={""}/>
                        </InputsWrapper>
                        <InputsWrapper title={"Email"}> <InputsFormik name={`email`} label={""}/></InputsWrapper>
                        <InputsWrapper title={"Телеграм"}> <InputsFormik name={`tg`} label={""}/></InputsWrapper>


                        <InputsWrapper title={"Биография"}>
                            <InputsFormik name={`biography`} label={""} textarea={true}/>
                        </InputsWrapper>

                        <InputsWrapper title={"Трудовая Деятельность"}>
                            <FieldArray
                                name="workHistory"
                                render={({push, remove}) => (
                                    <div>
                                        {values?.workHistory.map((video, index) => (
                                            <div key={index} className={s.fieldArray_wr}>
                                                <FieldArrayWrapper deleteFun={() => remove(index)}>
                                                    <InputsBlock index={index} type={"workHistory"} title={"Текст"}
                                                                 value={["text", "textRu", "textUz"]}/>
                                                </FieldArrayWrapper>
                                            </div>
                                        ))}

                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push({text: "", textRu: "", textUz: ""})}>
                                            <Button classN={"main"}>Добавить Деятельность</Button>
                                        </div>
                                    </div>
                                )}
                            />
                        </InputsWrapper>

                        <InputsWrapper title={"Обязанности"}>
                            <FieldArray
                                name="duty"
                                render={({push, remove}) => (
                                    <div>
                                        {values?.duty.map((video, index) => (
                                            <div key={index} className={s.fieldArray_wr}>
                                                <FieldArrayWrapper deleteFun={() => remove(index)}>
                                                    <InputsBlock index={index} type={"duty"} title={"Текст"}
                                                                 value={["text", "textRu", "textUz"]}/>
                                                </FieldArrayWrapper>
                                            </div>
                                        ))}

                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push({text: "", textRu: "", textUz: ""})}>
                                            <Button classN={"main"}>Добавить Обязанность</Button>
                                        </div>
                                    </div>
                                )}
                            />
                        </InputsWrapper>

                        <InputsWrapper title={"Фотография"}>
                            <PreviewImage condit={values?.url}
                                          imgUrl={values?.url}
                                          formikSetFun={setFieldValue}
                                          valueToDelete={values?.url}
                                          valueToSave={"url"}
                            />
                        </InputsWrapper>

                        <InputsWrapper title={"Должность"}>
                            <div className={s.isBoss}>
                                <p>Министр ?</p>
                                <Field name={"isBoss"} type={"checkbox"} className={"input_checkbox"}/>
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