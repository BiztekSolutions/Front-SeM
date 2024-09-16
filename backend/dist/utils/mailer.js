"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.noReplyInterface = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const destinatario1 = 'mgmastantuono@gmail.com';
const destinatario2 = 'Peixflor@gmail.com';
const destinatario3 = 'iniakitoo@gmail.com';
const user = 'nasir.stark@ethereal.email';
const { GMAIL_USER, GMAIL_PASS } = process.env;
// Configurar el transporte de Nodemailer
let noReplyTransporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});
exports.noReplyInterface = {
    transporter: noReplyTransporter,
    sendMailWithFrom: (data) => noReplyTransporter.sendMail(Object.assign(Object.assign({}, data), { from: {
            name: 'Salud en Movimiento',
            address: GMAIL_USER,
        } })),
};
const sendEmail = (from, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Configurar el correo electrónico
        const mailOptions = {
            from,
            to: [destinatario3],
            subject,
            text
        };
        const info = yield noReplyTransporter.sendMail(mailOptions);
        return info;
    }
    catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
