import axios, {AxiosError,HttpStatusCode} from "axios";

const axiosInstance = axios.create({ baseURL: 'http://localhost:3030', withCredentials: true});

const onRejected = (error: AxiosError) => {
    const request = error.config;
    const shouldResend = request && error.response?.status === HttpStatusCode.Unauthorized;
    const isTokenExpired = error.response?.data?.errorCode === "TOKEN_EXPIRED";

    if (isTokenExpired)
    window.localStorage.getItem("")
}