import {FC, useEffect, useState} from "react";
import {Field, FieldArray, Form, Formik} from "formik";

import s from './index.module.scss';
import {useTranslation} from "next-i18next";

import {InputsBlock} from "@/components/pages/admin/form_items/InputsBlock";
import {InputsBlockMain} from "@/components/pages/admin/form_items/InputsBlockMain";
import {Button} from "@/components/common/button/Button";
import {InputsFormik} from "@/components/common/input/InputsFormik";
import {PreviewImage} from "@/components/pages/admin/form_items/PreviewImage";
import {InputsWrapper} from "@/components/pages/admin/form_items/InputsWrapper";
import {FieldArrayWrapper} from "@/components/pages/admin/form_items/FieldArrayWrapper";
import {FormActions} from "@/components/pages/admin/form_items/FormActions";

import {getInitValueHomeForm} from "assets/function/getInitValueHomeForm";
import {
    bannerNumber,
    bannerNumberTitles, HomePageInt,
    statisticNumber,
    statisticNumberTitles, valuePushOpinions, valuePushSlider, valuePushUsefulLinks
} from "assets/constants/homeForm";


export const HomeForm: FC<{ data: HomePageInt | null }> = ({data}): JSX.Element => {
    const {t} = useTranslation();


    return (
        <div className={s.form}>
            <FormActions data={data}/>
            <Formik
                initialValues={getInitValueHomeForm(data)}
                enableReinitialize={true}
                onSubmit={async (val) => {
                    console.log(val);
                }}
            >
                {({values, setFieldValue, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={s.sections}>
                            <h4 className={s.titles}>Баннер</h4>
                            <InputsBlockMain title={"Заголовок"}
                                             arr={["banner[titleRu]", "banner[titleUz]", "banner[title]"]}/>
                            <InputsBlockMain title={"Описание"}
                                             arr={["banner[descriptionRu]", "banner[descriptionUz]", "banner[description]"]}
                                             textarea={true}/>

                            <InputsWrapper title={"Статистика"}>
                                <div className={s.number_banner_wr}>
                                    {
                                        bannerNumber.map((item, index) => {
                                            return <div key={item}>
                                                <p className={s.banner_number_title}>{t(`home:${bannerNumberTitles[index]}`)}</p>
                                                <Field name={`banner[${item}]`} className={"formik_input"}/>
                                            </div>;
                                        })
                                    }
                                </div>
                            </InputsWrapper>


                            <InputsWrapper title={"Фотография"}>
                                <PreviewImage condit={values?.banner?.url}
                                              imgUrl={values?.banner?.url}
                                              valueToDelete={values.banner?.url}
                                              formikSetFun={setFieldValue}
                                              valueToSave={"banner[url]"}
                                />
                            </InputsWrapper>
                        </div>

                        <div className={s.sections}>
                            <h4 className={s.titles}>Слайдер</h4>
                            <InputsWrapper title={"Слайды"}>
                                <FieldArray
                                    name="slider"
                                    render={({push, remove}) => (
                                        <div>
                                            {values?.slider?.map((slide, index) => (
                                                    <FieldArrayWrapper key={index} deleteFun={() => remove(index)}>
                                                        <InputsBlock index={index} type={"slider"} title={"Заголовок"}
                                                                     value={["title", "titleRu", "titleUz"]}/>
                                                        <InputsBlock index={index} type={"slider"} title={"Описание"}
                                                                     value={["description", "descriptionRu", "descriptionUZ"]}/>
                                                        <InputsFormik name={`slider.${index}.link`} label={"Ссылка"}/>

                                                        <PreviewImage condit={values?.slider[index]["url"]}
                                                                      imgUrl={values?.slider[index]["url"]}
                                                                      valueToDelete={values?.slider[index]["url"]}
                                                                      formikSetFun={setFieldValue}
                                                                      valueToSave={`slider[${index}].url`}
                                                        />
                                                    </FieldArrayWrapper>
                                            ))}

                                            <div className={s.fieldArray_btn_add} onClick={() =>
                                                push(valuePushSlider)}>
                                                <Button classN={"main"}>Добавить слайд</Button>
                                            </div>
                                        </div>
                                    )}
                                />
                            </InputsWrapper>
                        </div>

                        <div className={s.sections}>
                            <h4 className={s.titles}>Мнения</h4>
                            <InputsWrapper title={"Мнение"}>
                                <FieldArray
                                    name="opinion"
                                    render={({push, remove}) => (
                                        <div>
                                            {values?.opinion?.map((slide, index) => (
                                                <FieldArrayWrapper deleteFun={() => remove(index)} key={index}>
                                                    <InputsBlock index={index} type={"opinion"} title={"Заголовок"}
                                                                 value={["title", "titleRu", "titleUz"]}/>
                                                    <InputsBlock index={index} type={"opinion"} title={"Описание"}
                                                                 value={["subtitle", "subtitleRu", "subtitleUz"]}/>
                                                    <InputsBlock index={index} type={"opinion"} title={"Текст"}
                                                                 value={["text", "textRu", "textUz"]}/>
                                                </FieldArrayWrapper>
                                            ))}

                                            <div className={s.fieldArray_btn_add} onClick={() =>
                                                push(valuePushOpinions)}>
                                                <Button classN={"main"}>Добавить мнение</Button>
                                            </div>

                                        </div>
                                    )}
                                />
                            </InputsWrapper>
                        </div>

                        <div className={s.sections}>
                            <h4 className={s.titles}>Статистика</h4>
                            <InputsWrapper title={t(`home:callstatistics`)}>
                                <div className={s.statistic_wr}>
                                    {
                                        statisticNumber.slice(0, 4).map((item, index) => {
                                            return <div key={item}>
                                                <p className={s.banner_number_title}>{t(`home:${statisticNumberTitles[index]}`)}</p>
                                                <Field name={`statistic[${item}]`} className={"formik_input"}/>
                                            </div>;
                                        })
                                    }
                                </div>
                            </InputsWrapper>

                            <InputsWrapper title={t(`home:requestproces`)}>
                                <div className={s.statistic_wr}>
                                    {
                                        statisticNumber.slice(4).map((item, index) => {
                                            return <div key={item}>
                                                <p className={s.banner_number_title}>{t(`home:${statisticNumberTitles[index + 4]}`)}</p>
                                                <Field name={`statistic[${item}]`} className={"formik_input"}/>
                                            </div>;
                                        })
                                    }
                                </div>
                            </InputsWrapper>
                        </div>

                        <div className={s.sections}>
                            <h4 className={s.titles}>{t(`home:usefullinks`)}</h4>
                            <InputsWrapper title={"Ссылка"}>
                                <FieldArray
                                    name="usefulLinks"
                                    render={({push, remove}) => (
                                        <div>
                                            {values?.usefulLinks?.map((slide, index) => (
                                                <FieldArrayWrapper deleteFun={() => remove(index)} key={index}>
                                                    <InputsBlock index={index} type={"usefulLinks"}
                                                                 title={"Заголовок"}
                                                                 value={["title", "titleRu", "titleUz"]}/>
                                                    <InputsFormik name={`usefulLinks.${index}.link`}
                                                                  label={"Ссылка"}/>
                                                    <PreviewImage condit={values?.usefulLinks[index]["url"]}
                                                                  imgUrl={values?.usefulLinks[index]["url"]}
                                                                  valueToDelete={values?.usefulLinks[index]["url"]}
                                                                  formikSetFun={setFieldValue}
                                                                  valueToSave={`usefulLinks[${index}].url`}
                                                    />
                                                </FieldArrayWrapper>
                                            ))}

                                            <div className={s.fieldArray_btn_add} onClick={() =>
                                                push(valuePushUsefulLinks)}>
                                                <Button classN={"main"}>Добавить Ссылку</Button>
                                            </div>
                                        </div>
                                    )}
                                />
                            </InputsWrapper>
                        </div>

                        <div className={s.submit}>
                            <Button classN={"main"} submit={true}>Отправить</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};