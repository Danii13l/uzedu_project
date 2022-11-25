export const message = (name: string, email: string, phone: string, question: string) => {
  return {
    to: "info@bvxtb.uz",
    subject: "",
    html: `
    <h2>Отзыв от пользователя</h2>
    <ul>
        <li>name: ${name}</li>
        <li>phone: ${phone}</li>
        <li>email: ${email}</li>
        <li>question: ${question}</li>
    </ul>
    <p>Данное письмо не требует ответа.<p>`,
  };
};
