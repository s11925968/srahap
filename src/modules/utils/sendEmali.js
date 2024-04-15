import nodemailer from "nodemailer"


async function sendEmail(to,subject,html){
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user:"samehsmeerissa@gmail.com",
      pass:process.env.pass,
    },
  });
  const info = await transporter.sendMail({
    from: `Infinity Light <${"samehsmeerissa@gmail.com"}>`, // sender address
    to,// list of receivers
    subject, // Subject line
    html, // html body
  });
}
export default sendEmail;