import {FC, useState} from "react";
import {FieldArray, Form, Formik,} from "formik";

import s from './index.module.scss';

import {Button} from "@/components/common/button/Button";
import {InputsFormik} from "@/components/common/input/InputsFormik";
import {FileInput} from "@/components/common/input/FileInput";
import Image from "next/image";


const languages = [
    "Русский язык",
    "Узбекский язык",
    "Английский язык"
];


interface initialValuesIint {
    titleRu: string,
    titleUz: string,
    titleEn: string,
    descRu: string,
    descUz: string
    descEn: string,
    videos: { title: string; link: string }[],
    images: { title: string; link: string | File }[],
    files: { title: string, file: File }[]
}


const initialValues: initialValuesIint = {
    titleRu: "",
    titleUz: "",
    titleEn: "",
    descRu: "",
    descUz: "",
    descEn: "",
    videos: [],
    images: [],
    files: []
};

const handleFail = (ev: any) => {
    console.log(ev.target.files);
};


export const AdminForm: FC = (): JSX.Element => {


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
                                ["titleRu", "titleUz", "titleEn"].map((item, i) => {
                                    return <div key={i} className={s.input_wrapper}>
                                        <InputsFormik name={item} label={languages[i]}/>
                                    </div>;
                                })
                            }
                        </div>


                        <div className={s.section}>
                            <h5 className={s.sub_title}>Описание Страницы</h5>
                            {
                                ["descRu", "descUz", "descEn"].map((item, i) => {
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
                                                    <InputsFormik name={`videos[${index}].title`} label={"Заголовок"}/>
                                                    <InputsFormik name={`videos.${index}.link`} label={"Ссылка"}/>
                                                </div>

                                                <div onClick={() => remove(index)} className={s.fieldArray_btn}>
                                                    <Button classN={"second"}>Удалить</Button>
                                                </div>

                                            </div>
                                        ))}
                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push({title: '', link: ''})}>
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
                                                    <InputsFormik name={`images[${index}].title`} label={"Заголовок"}/>
                                                    {
                                                        values?.images[index]?.link ?
                                                            <div className={s.img_wrapper}>
                                                                <Image
                                                                    src={URL.createObjectURL(values?.images[index]?.link as any)}
                                                                    width={100}
                                                                    height={100}
                                                                    style={{borderRadius:"10px",overflow:"hidden"}}
                                                                    objectFit={"contain"}
                                                                />
                                                            </div>
                                                            : <FileInput labelText={"Загрузить"}
                                                                         name={`images[${index}].link`}
                                                                         changeFun={(ev: any) => setFieldValue(`images[${index}].link`, ev.target.files[0])}/>

                                                    }

                                                </div>


                                                <div onClick={() => remove(index)} className={s.fieldArray_btn}>
                                                    <Button classN={"second"}>Удалить</Button>
                                                </div>

                                            </div>
                                        ))}
                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push({title: '', link: ''})}>
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
                                                    <InputsFormik name={`files[${index}].title`} label={"Заголовок"}/>
                                                    {
                                                        fileF?.file ?
                                                            <p className={s.choosen_file}>Файл: <span>{fileF.file.name}</span>
                                                            </p> :
                                                            <FileInput labelText={"Загрузить"}
                                                                       name={`files[${index}].file`}
                                                                       changeFun={(ev: any) => setFieldValue(`files[${index}].file`, ev.target.files[0])}/>
                                                    }

                                                </div>
                                                <div onClick={() => remove(index)} className={s.fieldArray_btn}>
                                                    <Button classN={"second"}>Удалить</Button>
                                                </div>

                                            </div>
                                        ))}
                                        <div className={s.fieldArray_btn_add} onClick={() =>
                                            push({title: '', file: ''})}>
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