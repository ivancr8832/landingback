import { Transporter, createTransport } from 'nodemailer';
import { envs } from '../config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { TYPE_CONTACT } from '../enums';
import { CreateContactDto } from '../dtos';

export class SendingEmail {
    private readonly configuration: Transporter<SMTPTransport.SentMessageInfo>;

    constructor(){
        this.configuration = createTransport({
            host: envs.EMAIL_HOST,
            secure: true,
            tls: {
                ciphers: "SSLv3"
            },
            requireTLS: true,
            port: envs.EMAIL_PORT,
            debug: true,
            connectionTimeout: 10000,
            auth: {
                user: envs.EMAIL,
                pass: envs.EMAIL_PASSWORD
            }
        })
    }

    public sendingEmail({ contact }: CreateContactDto): Promise<string>{
        const { name, lastName, typeContact, email, phone, address, dateVisit, hour, message, subject } = contact;

        let mailOption = {
            from: envs.EMAIL,
            to: envs.EMAIL,
            subject: '',
            html: '',
        }

        switch (typeContact) {
            case TYPE_CONTACT.VIRTUAL:
                mailOption = {
                    ...mailOption,
                    subject: 'AGENDAMIENTO DE CITA - VIRTUAL',
                    html: `
                        <p style="font-weight: bold; font-size: 25px">
                            ${name.toUpperCase()} ${lastName.toUpperCase()} ha agendado una CITA VIRTUAL:
                        </p>
                        <ul>
                            <li>Email: <strong>${email}</strong></li>
                            <li>Teléfono: <strong>${phone}</strong></li>
                            <li>Fecha: <strong>${dateVisit!}</strong></li>
                            <li>Hora: <strong>${hour}</strong></li>
                        </ul>
                    `
                }
                break;
            case TYPE_CONTACT.PRESENTIAL:
                mailOption = {
                    ...mailOption,
                    subject: 'AGENDAMIENTO DE CITA - PRESENCIAL',
                    html: `
                        <p style="font-weight: bold; font-size: 25px">
                            ${name.toUpperCase()} ${lastName.toUpperCase()} ha agendado una CITA PRESENCIAL:
                        </p>
                        <ul>
                            <li>Email: <strong>${email}</strong></li>
                            <li>Teléfono: <strong>${phone}</strong></li>
                            <li>Fecha: <strong>${dateVisit!}</strong></li>
                            <li>Hora: <strong>${hour}</strong></li>
                            <li>Dirección: <strong>${address}</strong></li>
                        </ul>
                    `
                }
                break;
            case TYPE_CONTACT.MESSAGE:
                mailOption = {
                    ...mailOption,
                    subject: 'SOLICITUD DE REQUERIMIENTO',
                    html: `
                        <p style="font-weight: bold; font-size: 25px">
                            ${subject}
                        </p>
                        <ul>
                            <li>Nombre: <strong>${name.toUpperCase()} ${lastName.toUpperCase()}</strong></li>
                            <li>Email: <strong>${email}</strong></li>
                            <li>Teléfono: <strong>${phone}</strong></li>
                            <li>Mensaje: <strong>${message}</strong></li>
                        </ul>
                    `
                }
                break;
        }

        return new Promise((resolve, reject) => {
            this.configuration.sendMail(mailOption, (err, data) => {
                if (err) return reject('No se pudo enviar el correo electronico');
                return resolve('Email enviado correctamente');
            });
        });
    }
}