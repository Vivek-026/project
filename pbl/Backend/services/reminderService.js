const Event = require("../models/Event");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const scheduleEmailReminders = async () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const dateStr = tomorrow.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  try {
    const events = await Event.find({ date: dateStr });

    for (const event of events) {
      for (const reg of event.registrations) {
        if (reg.email) {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: reg.email,
            subject: `Reminder: ${event.title} is tomorrow!`,
            text: `Hey ${reg.name},\n\nDon't forget! The event "${event.title}" is scheduled for tomorrow at ${event.time}.\n\nLocation: ${event.location}\n\nCheers,\nClubConnect Team`,
          });
          console.log(`📧 Reminder sent to ${reg.email}`);
        }
      }
    }
  } catch (err) {
    console.error("❌ Error sending reminder emails:", err.message);
  }
};

module.exports = scheduleEmailReminders;
