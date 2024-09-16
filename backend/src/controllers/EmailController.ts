import { Request, Response } from 'express';
import { sendEmail } from '../utils/mailer';

export const enviarCorreo = async (req: Request, res: Response) => {
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
    await sendEmail(email, asunto, texto);
    

    // Respuesta exitosa
    res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
  } catch (error) {
    // Manejo de errores
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Error al enviar el correo electrónico' });
  }
};


