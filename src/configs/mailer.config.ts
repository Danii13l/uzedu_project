import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(
  {
    host: "server3.ahost.uz",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      // Пожалуйста, используйте свой собственный аккаунт для рассылки
      user: "send.site@bvxtb.uz", // (замените звездочики на название вашего почтового ящика)
      pass: "L2jZM2zR+BR)", //  (замените звездочики на пароль вашего почтового ящика)
    },
  },
  {
    from: `send.site@bvxtb.uz`,
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
