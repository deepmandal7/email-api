const Logger = require("../utilities/logger"),
  sgMail = require("@sendgrid/mail"),
  { ObjectId } = require("mongoose").Types,
  { Email } = require("../models");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (Agenda) => {
  try {
    const agenda = new Agenda({ db: { address: process.env.NODE_ENV === "development" ? process.env.MONGO_LOCAL : process.env.MONGO_URI } });

    agenda.on("ready", () => Logger.info("Scheduler started")).on("error", () => Logger.info("Scheduler connection error"));
    agenda.define("send scheduled email", { priority: "high", concurrency: 10 }, async () => {
      let date = new Date();
      date.setSeconds(0);
      date.setMilliseconds(0);
      const emails = await Email.find({ email_status: "Scheduled", email_scheduled_at: date });
      for (email of emails) {
        if (String(email.email_scheduled_at) == String(date)) {
          const msg = {
            to: email.email_recepient,
            from: process.env.EMAIL_SENDER,
            subject: "Sendgrid test",
            text: email.email_body,
          };
          sgMail
            .send(msg)
            .then(async () => {
              Logger.info("Email sent");
              await Email.updateOne({ _id: ObjectId(email._id) }, { email_status: "Sent" });
            })
            .catch(async (err) => {
              await Email.updateOne({ _id: ObjectId(email._id) }, { email_status: "Failed" });
              Logger.error(err);
            });
        }
      }
    });

    (async function () {
      await agenda.start();
      await agenda.every("1 minute", "send scheduled email");
    })();
  } catch (err) {
    Logger.info(err);
  }
};
