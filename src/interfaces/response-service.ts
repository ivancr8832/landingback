import { STATUS_CODE } from "../enums"

export interface ResponseHttp<T> {
    status: STATUS_CODE;
    data?: T;
    error?: any;
}