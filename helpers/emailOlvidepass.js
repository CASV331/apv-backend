import nodemailer from "nodemailer";

const emailOlvidePass = async (datos) => {
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
    subject: "Restablece tu contraseña",
    text: "Restablece tu contraseña",
    html: `<p>Hola ${nombre}, has solicitado restablecer tu contraseña.</p>

      <p>Ingresa al siguiente enlace para registrar tu nueva contraseña:
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer contraseña</a> </p>
  
      <p>Si tu no solicitaste este cambio, puedes ignorar este mensaje</p>
      
      `,
  });

  console.log("mensaje enviado: %s", info.messageId);
};

export default emailOlvidePass;
