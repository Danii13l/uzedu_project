import axios from "axios";
import Cookies from "js-cookie";

export const myAxios=axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_BASE_URL}`,
    headers: {
        'Authorization': `Bearer ${Cookies.get('userInfo')}`
    },
})