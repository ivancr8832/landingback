import { STATUS_RECORD } from "../enums";

export interface Video {
    id: number;
    url: string;
    status: STATUS_RECORD;
}