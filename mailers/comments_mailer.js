const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  //console.log("Inside the mailer");
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: "shyamwinner18@gmail.com",
      to: comment.user.email,
      subject: "New comment published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("error in publishing comment", err);
        return;
      }
      // console.log("mail delivered ", info);
      return;
    }
  );
};
