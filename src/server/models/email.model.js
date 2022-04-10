const emailSchema = new (require("mongoose").Schema)(
  {
    email_body: { type: String, required: false },
    email_scheduled_at: { type: Date, required: false },
    email_status: { type: String, required: false, default: "Scheduled" },
    email_recepient: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Email = require("mongoose").model("Email", emailSchema);

module.exports = Email;
