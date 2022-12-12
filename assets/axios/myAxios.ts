import axios from "axios";
import Cookies from "js-cookie";

export const getToken = () => Cookies.get("userInfo")
    ? Cookies.get("userInfo")
    : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;



export const myAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    headers: { Authorization: getAuthorizationHeader() },
});