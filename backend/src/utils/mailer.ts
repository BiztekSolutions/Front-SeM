import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Mail from 'nodemailer/lib/mailer';

dotenv.config();

const destinatario1 = 'mgmastantuono@gmail.com';
const destinatario2 = 'Peixflor@gmail.com';
const destinatario3 = 'iniakitoo@gmail.com';
const user = 'nasir.stark@ethereal.email'

const { GMAIL_USER, GMAIL_PASS } = process.env;
// Configurar el transporte de Nodemailer
let noReplyTransporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS  
    }
  });

  
  export const noReplyInterface = {
    transporter: noReplyTransporter,
    sendMailWithFrom: (data: Mail.Options) =>
      noReplyTransporter.sendMail({
        ...data,
        from: {
          name: 'Salud en Movimiento',
          address: GMAIL_USER!,
        },
      }),
    };
    
    export const sendEmail = async (from: string, subject: string, text: string) => {
      try {
        // Configurar el correo electrónico
        const mailOptions = {
          from,
          to: [destinatario3],
          subject,
          text
        };
        console.log(mailOptions, 'mailOptions!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        
        
        const info = await noReplyTransporter.sendMail(mailOptions);
        console.log(info, 'info!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        return info;
      } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error; 
      }
    };