import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, subject, text }) => {
  try {
   
    let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: "zairo.developer@gmail.com", 
        pass: "gwlz rnrv gpio uzcp", 
      },
    });

    // Set up email options
    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`, 
      to: email, 
      subject: subject, 
      text: text,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log('No-reply email sent successfully');
  } catch (error) {
    console.error('Error sending no-reply email:', error);
    throw new Error('Could not send no-reply email');
  }
};
