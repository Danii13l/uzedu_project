export const message = (name:string ,email: string, phone: string, description:string) => {
  return {
    to: "admina@uzedu.uz",
    subject: "",
    html: `
    <h2>Отзыв от пользователя</h2>
    <ul>
        <li>name: ${name}</li>
        <li>email: ${email}</li>
        <li>phone: ${phone}</li>
        <li>phone: ${description}</li>
    </ul>
    <p>Данное письмо не требует ответа.<p>`,
  };
};
