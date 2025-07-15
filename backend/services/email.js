const { Resend } = require("resend");
require("dotenv").config();

async function sendOtp(email, otp) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Please verify your email",
      html: `<p>Use this one time password (OTP): <strong>${otp}</strong></p>`,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    console.log("Email sent:", response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

async function sendInvite(email, chatId) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "You've Been Invited to Join a Group Chat",
      html: `<p>Hi there,</p>

    <p>
      You’ve been invited to join a group chat where you can connect and
      collaborate with others.
    </p>

    <p>
      To accept the invitation and join the conversation, simply click the
      button below:
    </p>

    <p style="text-align: center; margin: 30px 0;">
      <a
        href="${process.env.PUBLIC_URL}/?chatId=${chatId}"
        style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;"
      >
        Join Group Chat
      </a>
      </p>

      <p>
        Or you can manually copy and paste the Chat ID below into the app:
      </p>

      <pre
        style="background-color: #f3f3f3; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 14px;"
      >${chatId}</pre>
    `,
    });

    if (response.error) {
      throw new Error(response.error);
    }
  } catch (error) {}
}

module.exports = { sendOtp, sendInvite };
