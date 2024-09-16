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
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarCorreo = void 0;
const mailer_1 = require("../utils/mailer");
const enviarCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraer los datos del cuerpo de la solicitud
        console.log(req.body);
        const { firstName, lastName, email, interest, message } = req.body;
        // Construir el asunto del correo
        const asunto = `Interés en ${interest}`;
        // Construir el texto del correo
        const texto = `Nombre: ${firstName} ${lastName}\nEmail: ${email}\nMensaje: ${message}`;
        console.log(email);
        // Enviar el correo electrónico
        yield (0, mailer_1.sendEmail)(email, asunto, texto);
        // Respuesta exitosa
        res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    }
    catch (error) {
        // Manejo de errores
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
});
exports.enviarCorreo = enviarCorreo;
