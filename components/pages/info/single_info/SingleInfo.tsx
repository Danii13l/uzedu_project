import Image from "next/image";
import { FC } from "react";

export const SingleInfo: FC = ({ data }): JSX.Element => {


    return <div className="page_container" style={{ "marginTop": "32px" }}>
        <div className="page_img_wrapper">
            <div className="page_img">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
            </div>
            <div className="page_img_shadow"></div>
        </div>
        <p className="page_inner_text">{data.description}</p>
    </div>;
};