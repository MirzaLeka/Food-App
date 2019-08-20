const nodemailer = require('nodemailer');

const emailService = process.env.EMAIL_SERVICE;
const foodAppEmail = process.env.EMAIL_USER;
const foodAppPW = process.env.EMAIL_PASS;

module.exports.sendEmail = (company, companyEmail, authString, serviceType) => {

  const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: foodAppEmail,
      pass: foodAppPW
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let emailMessage = '';
  let emailSubject = '';

  // if new company has registered
  if ( serviceType === 'register' ) {
    emailSubject = 'Welcome to Food App';

    emailMessage = `<p> Hi ${company}, <br/>
    you successfully registered to <a href='http://localhost:3000' target='_blank'>Food App</a>.
    We hope you'll enjoy using our services. <br/><br/>
    <b>Food App Team</b>
    </p>`;
  }


  // if company requested password reset
  else if ( serviceType === 'request password reset' ) {

    emailSubject = 'Food App Verification Message';

    emailMessage = `<p> Hi ${company}, <br/>
    looks like you requested a password reset.
    To proceed go to <a href='http://localhost:3000/reset-password' target='_blank'>this page</a> 
    and paste the following verification code: <br/><em>${authString}</em> <br/>
    Please keep in mind that you can only use this code once and then it will be destroyed. <br/>
    If this wasn't you, please ignore this message. <br/><br/>
    <b>Food App Team</b>
    </p>`;
  }
      
  const mailOptions = {
    from: foodAppEmail,
    to: companyEmail,
    subject: emailSubject,
    html: emailMessage
   };
      
   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       console.log(error);
     } 
   });
      
}
