const { Resend } = require('resend');

const resend = new Resend(process.env.TRANSPORT_PASS);

const sendBookingEmail = async (email,name,date,time,)=>{
const data = await resend.emails.send({
  from: process.env.TRANSPORT_USER,
  to: "cutsandustle@gmail.com",
  subject: 'Cuts & Hustle',
  html: `
            <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h2 style="color: #333;">Hi, ${name}!</h2>
                <p>We are happy to inform you, that we confirmed your booking.</p>
                <hr>
                <p><strong>date:</strong> ${date}</p>
                <p><strong>time:</strong> ${time}</p>
                <hr>
                <p>We can't wait to have you here!<br>
                <small>Cuts & Hustle team :D</small></p>
            </div>
        `
});
console.log("Email sent:",data)

}


module.exports={sendBookingEmail}