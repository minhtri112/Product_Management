const nodemailer = require('nodemailer');

module.exports.sendMail = (email,subject,html)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      const mailOptions = {
        from: 'minhtri084038@gmail.com',
        to: email,
        subject: 'Subject',
        html : html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
}