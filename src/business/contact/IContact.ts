import { CreateContactDto } from "../../dtos";
import { ResponseHttp } from "../../interfaces";

export interface IContact {
    createContact(createContactDto: CreateContactDto): Promise<ResponseHttp<string>>;
}