import Image from "next/image";
import { FC } from "react";

export const SingleInfo: FC = ({ data }: any): JSX.Element => {


    return <div className="page_container" style={{ "marginTop": "32px" }}>
        <div className="page_img_wrapper">
            <div className="page_img">
                <Image src={!data?.url || data?.url?.length === 0 ? "/images/common/default_photo.jpg" : `${process.env.NEXT_PUBLIC_BASE_URL}${data?.url}`} alt="person" layout="fill" objectFit="cover" unoptimized />
            </div>
            <div className="page_img_shadow"></div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
    </div>;
};