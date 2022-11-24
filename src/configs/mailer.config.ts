import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(
  {
    host: process.env.NEXT_PUBLIC_SMTP_SERVER,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      // Пожалуйста, используйте свой собственный аккаунт для рассылки
      user: process.env.MAIL_USER, // (замените звездочики на название вашего почтового ящика)
      pass: process.env.MAIL_PASSWORD, //  (замените звездочики на пароль вашего почтового ящика)
    },
  },
  {
    from: `Bukhara <${process.env.MAIL_FROM}>`,
  }
);

export const mailer = (message: any) => {
  transporter.sendMail(message, (err: any, info) => {
    if (err) {
      console.log(err.message);
    }
    console.log(info);
  });
};
