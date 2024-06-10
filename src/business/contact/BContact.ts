import { Prisma } from "@prisma/client";
import { CreateContactDto } from "../../dtos";
import { STATUS_CODE, TYPE_CONTACT } from "../../enums";
import { ResponseHttp } from "../../interfaces";
import { IContact } from "./IContact";
import { prisma } from "../../db/mysql";
import moment from "moment";
import { SendingEmail } from "../../helper";

export class BContact implements IContact {
    public async createContact(createContactDto: CreateContactDto): Promise<ResponseHttp<string>> {
        try {
            const { name, lastName, email, phone, address, dateVisit, hour, message, subject, status, typeContact } = createContactDto.contact;
            let contact: Prisma.CONTACTCreateInput;

            switch(typeContact) {
                case TYPE_CONTACT.VIRTUAL:
               
                contact = {
                        CON_NAME: name.toUpperCase().trim(),
                        CON_LASTNAME: lastName.toUpperCase().trim(),
                        CON_EMAIL: email.toLowerCase().trim(),
                        CON_PHONE: phone.trim(),
                        CON_DATE_VISIT: moment(dateVisit!, 'DD/MM/YYYY').toDate(),
                        CON_HOUR: hour?.trim(),
                        CON_TYPE_CONTACT: TYPE_CONTACT.VIRTUAL,
                        CON_STATUS: status
                    }
                break;
                case TYPE_CONTACT.PRESENTIAL:
                    contact = {
                        CON_NAME: name.toUpperCase().trim(),
                        CON_LASTNAME: lastName.toUpperCase().trim(),
                        CON_EMAIL: email.toLowerCase().trim(),
                        CON_PHONE: phone.trim(),
                        CON_ADDRESS: address,
                        CON_DATE_VISIT: moment(dateVisit!, 'DD/MM/YYYY').toDate(),
                        CON_HOUR: hour?.trim(),
                        CON_TYPE_CONTACT: TYPE_CONTACT.PRESENTIAL,
                        CON_STATUS: status
                    }
                break;
                case TYPE_CONTACT.MESSAGE:
                    contact = {
                        CON_NAME: name.toUpperCase().trim(),
                        CON_LASTNAME: lastName.toUpperCase().trim(),
                        CON_EMAIL: email.toLowerCase().trim(),
                        CON_PHONE: phone.trim(),
                        CON_SUBJECT: subject,
                        CON_MESSAGE: message,
                        CON_TYPE_CONTACT: TYPE_CONTACT.MESSAGE,
                        CON_STATUS: status
                    }
                break;
            }

            await prisma.cONTACT.create({ data: contact });

            //TODO: HACER POCESO DE CONEXION A HUBSOPT
            const sendEmail = new SendingEmail();
            await sendEmail.sendingEmail(createContactDto);

            return {
                status: STATUS_CODE.OK,
                data: '¡Excelente! Hemos recibido tus datos y te contactaremos de inmediato'
            }

        } catch (error) {
            console.log(error);
            throw {
                status: STATUS_CODE.BAD_REQUEST,
                error: 'Hubo un problema al enviar la solicitud'
            }
        }
    }
}