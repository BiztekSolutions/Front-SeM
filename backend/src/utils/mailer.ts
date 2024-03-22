import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const destinatario1 = 'mgmastantuono@gmail.com';
const destinatario2 = 'Peixflor@gmail.com';
const user = 'nasir.stark@ethereal.email'

const { CONTRA_TRANSPORTER_MAIL } = process.env;



// Configurar el transporte de Nodemailer
let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', // Host del servidor SMTP de Gmail
    port: 587, // Puerto para la conexión SMTP
    secure: false, // true para usar TLS, false para no usar (en este caso, TLS se manejará automáticamente mediante STARTTLS)
    auth: {
      user, // Tu dirección de correo electrónico
      pass: CONTRA_TRANSPORTER_MAIL // Tu contraseña
    }
  });

// Función para enviar un correo electrónico
export const sendEmail = async (from: string, subject: string, text: string) => {
  try {
    // Configurar el correo electrónico
    const mailOptions = {
      from,
      to: [destinatario1, destinatario2],
      subject,
      text
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
  
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error; // Relanza el error para que el controlador lo maneje
  }
};
// mgmastantuono@gmail.com
// Peixflor@gmail.com