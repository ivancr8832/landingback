import { STATUS_CODE, TYPE_CONTACT } from "../enums";

export interface Contact {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    dateVisit?: Date;
    hour?: string;
    subject?: string;
    message?: string;
    typeContact: TYPE_CONTACT;
    status: STATUS_CODE;
}