import { Request, Response } from "express";
import { IContact } from "../../business";
import { CreateContactDto } from "../../dtos";
import { STATUS_CODE } from "../../enums";

export class ContactController {
    constructor(
        private readonly contact: IContact
    ){}

    createContact = (req: Request, res: Response) => {
        const [error, createContactDto] = CreateContactDto.create(req.body);
        if (error) return res.status(STATUS_CODE.BAD_REQUEST).json({ error });
        this.contact.createContact(createContactDto!)
            .then(({ status, data, error }) => res.status(status).json({ data, error }))
            .catch(error => res.status(error.status).json(error.error))
    }
}