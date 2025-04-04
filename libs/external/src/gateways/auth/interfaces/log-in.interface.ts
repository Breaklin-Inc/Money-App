export interface ILogInBodyReq {
    email: string;
    password: string;
}

export interface ILogInBodyRes {
    email: string;
    username: string;
    accessToken: string
}