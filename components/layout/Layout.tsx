import React, {FC} from "react";
import Head from "next/head";

import s from './index.module.scss'

import {Header} from "../common/header/Header";
import {Footer} from "../common/footer/Footer";
import {useBlackAndWhite} from "../../assets/hooks/useBlackAndWhite";
import {useSelector} from "react-redux";
import {RootState} from "../../assets/redux/store";

interface LayoutInt {
    title: string;
    contentDesc: string;
    children: React.ReactNode;
}

export const Layout: FC<LayoutInt> = ({title, contentDesc, children}): JSX.Element => {

    const {bAndw} = useSelector(({blackWhite}: RootState) => blackWhite)


    return <div className={`${s.layout} ${bAndw ? s.black : ""}`}>
        <Head>
            <title>{title}</title>
            <meta name="description" content={contentDesc}/>
        </Head>
        <Header/>
        <main>{children}</main>
        <Footer/>
    </div>
}