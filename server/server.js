//Change me
process.env.MAIL_URL="smtp://[Your Email Here]]:[Your Password Here]@smtp.gmail.com:465/";

Meteor.methods({
  reportUser: function(user, log) {
    Email.send({
      from: "meteor.email.2014@gmail.com",
      to: "thesaltbot@gmail.com",
      subject: "User Report: " + user,
      text: log
    });
  }
});
