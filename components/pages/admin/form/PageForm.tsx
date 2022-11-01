import {FC} from "react";
import Image from "next/image";

import {FieldArray, Form, Formik,} from "formik";

import s from './index.module.scss';

import {Button} from "@/components/common/button/Button";
import {InputsFormik} from "@/components/common/input/InputsFormik";
import {FileInput} from "@/components/common/input/FileInput";


const languages = [
    "Русский язык",
    "Узбекский язык",
    "Английский язык"
];


interface initialValuesIint {
    titleRu: string,
    titleUz: string,
    title: string,
    descriptionRu: string,
    descriptionUz: string
    description: string,
    videos: {
        "title": string,
        "titleRu": string,
        "titleUz": string,
        "url": string
    }[],
    images: {
        "title": string,
        "titleRu": string,
        "titleUz": string,
        "url": string
    }[],
    files: {
        "title": string,
        "titleRu": string,
        "titleUz": string,
        "url": File,
    }[]
}


const initialValues: initialValuesIint = {
    titleRu: "",
    titleUz: "",
    title: "",
    descriptionRu: "",
    descriptionUz: "",
    description: "",
    videos: [],
    images: [],
    files: []
};

const f = {
    title: "",
    titleRu: "",
    titleUz: "",
    url: ""
}


export const PageForm: FC = (): JSX.Element => {

    return (
        <div className={s.form}>
            <Formik
                initialValues={initialValues}
                onSubmit={(val) => {
                    console.log(val);
                }}
            >
                {({values, setFieldValue, handleSubmit, handleChange}) => (
                    <Form onSubmit={handleSubmit}>

                        <div className={s.section}>
                            <h5 className={s.sub_title}>Заголовок Страницы</h5>
                            {
                                ["titleRu", "titleUz", "title"].map((item, i) => {
                                    return <div key={i} className={s.input_wrapper}>
                                        <InputsFormik name={item} label={languages[i]}/>
                                    </div>;
                                })
                            }
                        </div>


                        <div className={s.section}>
                            <h5 className={s.sub_title}>Описание Страницы</h5>
                            {
                                ["descriptionRu", "descriptionUz", "description"].map((item, i) => {
                                    return <div key={i} className={s.input_wrapper}>
                                        <InputsFormik name={item} label={languages[i]} textarea/>
                                    </div>;
                                })
                            }
                        </div>


                        <div className={s.section}>
                            <h5 className={s.sub_title}>Видео</h5>
                            <FieldArray
                                name="videos"
                                render={({push, remove}) => (
                                    <div>
                                        {values?.videos.map((video, index) => (
                                            <div key={index} className={s.fieldArray_wr}>
                                                <div className={s.fieldArray_box}>
                                                    <InputsFormik name={`videos[${index}].title`}
                                                                  label={"Заголовок на английском"}/>
                                                    <InputsFormik name={`videos[${index}].titleRu`}
                                                                  label={"Заголовок на русском"}/>
                                                    <InputsFormik name={`videos[${index}].titleUz`}
                                                                  label={"Заголовок на узбекском"}/>
                                                    <InputsFormik name={`videos.${index}.url`} label={"Ссылка"}/>
                                                </div>

                                                <div onClick={() => remove(index)} className={s.fieldArray_btn}>
                                                    <Button classN={"second"}>Удалить</Button>
                                                </div>

                                            </div>
                                        ))}
                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push(f)}>
                                            <Button classN={"main"}>Добавить видео</Button>
                                        </div>

                                    </div>
                                )}
                            />
                        </div>


                        <div className={s.section}>
                            <h5 className={s.sub_title}>Фотографии</h5>
                            <FieldArray
                                name="images"
                                render={({push, remove}) => (
                                    <div>
                                        {values?.images.map((image, index) => (
                                            <div key={index} className={s.fieldArray_wr}>
                                                <div className={s.fieldArray_box}>
                                                    <InputsFormik name={`images[${index}].title`}
                                                                  label={"Заголовок на английском"}/>
                                                    <InputsFormik name={`images[${index}].titleRu`}
                                                                  label={"Заголовок на русском"}/>
                                                    <InputsFormik name={`images[${index}].titleUz`}
                                                                  label={"Заголовок на узбекском"}/>

                                                    {
                                                        values?.images[index]?.url &&
                                                        <div className={s.img_wrapper}>
                                                            <Image
                                                                src={URL.createObjectURL(values?.images[index]?.url as any)}
                                                                width={100}
                                                                height={100}
                                                                style={{borderRadius: "10px", overflow: "hidden"}}
                                                                objectFit={"contain"}
                                                            />
                                                        </div>}
                                                    <FileInput labelText={"Загрузить"}
                                                               name={`images[${index}].url`}
                                                               changeFun={(ev: any) => setFieldValue(`images[${index}].url`, ev.target.files[0])}/>


                                                </div>


                                                <div onClick={() => remove(index)} className={s.fieldArray_btn}>
                                                    <Button classN={"second"}>Удалить</Button>
                                                </div>

                                            </div>
                                        ))}
                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push(f)}>
                                            <Button classN={"main"}>Добавить Фотографию</Button>
                                        </div>

                                    </div>
                                )}
                            />
                        </div>

                        <div className={s.section}>
                            <h5 className={s.sub_title}>Файлы</h5>
                            <FieldArray
                                name="files"
                                render={({push, remove}) => (
                                    <div>
                                        {values?.files.map((fileF, index) => (
                                            <div key={index} className={s.fieldArray_wr}>
                                                <div className={s.fieldArray_box}>
                                                    <InputsFormik name={`files[${index}].title`}
                                                                  label={"Заголовок на английском"}/>
                                                    <InputsFormik name={`files[${index}].titleRu`}
                                                                  label={"Заголовок на русском"}/>
                                                    <InputsFormik name={`files[${index}].titleUz`}
                                                                  label={"Заголовок на узбекском"}/>
                                                    {
                                                        fileF?.url &&
                                                        //@ts-ignore
                                                        <p className={s.choosen_file}>Файл: <span>{fileF.url?.name}</span>
                                                        </p>
                                                    }
                                                    <FileInput labelText={"Загрузить"}
                                                               name={`files[${index}].url`}
                                                               changeFun={(ev: any) => setFieldValue(`files[${index}].url`, ev.target.files[0])}/>


                                                </div>
                                                <div onClick={() => remove(index)} className={s.fieldArray_btn}>
                                                    <Button classN={"second"}>Удалить</Button>
                                                </div>

                                            </div>
                                        ))}
                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push(f)}>
                                            <Button classN={"main"}>Добавить файл</Button>
                                        </div>

                                    </div>
                                )}
                            />
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