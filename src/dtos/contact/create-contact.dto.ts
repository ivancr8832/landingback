import { TYPE_CONTACT } from "../../enums";
import { Validators } from "../../helper";
import { Contact } from "../../interfaces";

export class CreateContactDto {
    private constructor(
        public readonly contact: Contact
    ){}

    public static create(object: { [key: string]: any }): [string?, CreateContactDto?] {
        const { name, lastName, email, phone, address, dateVisit, hour, subject, message, typeContact, status } = object;

        if (!name) return ['Missing name'];
        if (!lastName) return ['Missing lastName'];
        if (!phone) return ['Missing phone'];
        if (!email) return ['Missing email'];
        if (!Validators.email.test(email)) return ['Email is not valid'];

        switch (typeContact as TYPE_CONTACT) {
            case TYPE_CONTACT.VIRTUAL:
                if (!dateVisit) return ['Missing date visit']
                if (!hour) return ['Missing hour']
            break;
            case TYPE_CONTACT.PRESENTIAL:
                if (!dateVisit) return ['Missing date visit']
                if (!hour) return ['Missing hour']
                if (!address) return ['Missing address']
            break;
            case TYPE_CONTACT.MESSAGE:
                if (!subject) return ['Missing subject']
                if (!message) return ['Missing message']
            break;
        }

        return [undefined, new CreateContactDto({ name, lastName, email, phone, address, dateVisit, hour, subject, message, typeContact, status })];
    }
}