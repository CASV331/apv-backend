import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email, nombre, token } = datos;

  // Enviar el Email
  const info = await transport.sendMail({
    from: "APV - Administrador de pacientes",
    to: email,
    subject: "Confirma tu cuenta en APV",
    text: "Comprueba tu cuenta en APV",
    html: `<p>Hola ${nombre}, confirma tu cuenta en APV.</p>
    <p>Tu cuenta esta lista, solo debes confirmarla en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a> </p>

    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    
    `,
  });

  console.log("mensaje enviado: %s", info.messageId);
};

export default emailRegistro;
