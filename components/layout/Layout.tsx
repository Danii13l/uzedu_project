import React, { FC } from "react";
import Head from "next/head";

import s from './index.module.scss';

import { RootState } from "assets/redux/store";
import { useSelector } from "react-redux";

import { Header } from "@/components/common/header/Header";
import { Footer } from "@/components/common/footer/Footer";
import { SidebarMenu } from "@/components/common/sidebar_menu/SidebarMenu";

interface LayoutInt {
    title: string;
    contentDesc: string;
    children: React.ReactNode;
}

export const Layout: FC<LayoutInt> = ({ title, contentDesc, children }): JSX.Element => {

    const { bAndw } = useSelector(({ blackWhite }: RootState) => blackWhite);


    return <div className={`${s.layout} ${bAndw ? s.black : ""}`}>
        <Head>
            <title>{title}</title>
            <meta name="description" content={contentDesc} />
        </Head>
        <Header />
        <SidebarMenu />
        <main>{children}</main>
        <Footer />
    </div>;
};