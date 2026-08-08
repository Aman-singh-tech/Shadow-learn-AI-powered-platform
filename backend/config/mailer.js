const sgMail = require('@sendgrid/mail');

/**
 * Send a password reset email via SendGrid.
 *
 * Requirements (set in your .env / Render environment):
 *   SENDGRID_API_KEY  – your SendGrid API key (starts with SG.)
 *   EMAIL_FROM        – a verified sender address in your SendGrid account
 *                       e.g. "ShadowLearn <you@yourdomain.com>"
 *
 * @param {string} toEmail  - Recipient email address
 * @param {string} resetUrl - Full URL for the password reset link
 */
const sendPasswordResetEmail = async (toEmail, resetUrl) => {
    const apiKey = process.env.SENDGRID_API_KEY;
    const fromAddress = process.env.EMAIL_FROM;

    if (!apiKey) {
        throw new Error('SENDGRID_API_KEY is not set in environment variables.');
    }
    if (!fromAddress) {
        throw new Error('EMAIL_FROM is not set in environment variables.');
    }

    sgMail.setApiKey(apiKey);

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="color: #6366f1; margin: 0;">🎓 ShadowLearn</h2>
                <p style="color: #888; font-size: 14px; margin-top: 4px;">AI-Powered Learning Platform</p>
            </div>
            <div style="background: white; padding: 28px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.07);">
                <h3 style="color: #1a1a2e; margin-top: 0;">Password Reset Request</h3>
                <p style="color: #444; line-height: 1.6;">
                    We received a request to reset the password for your ShadowLearn account associated with <strong>${toEmail}</strong>.
                </p>
                <p style="color: #444; line-height: 1.6;">
                    Click the button below to reset your password. This link will expire in <strong>1 hour</strong>.
                </p>
                <div style="text-align: center; margin: 28px 0;">
                    <a href="${resetUrl}"
                       style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6);
                              color: white; padding: 14px 32px; border-radius: 8px;
                              text-decoration: none; font-weight: bold; font-size: 16px;
                              letter-spacing: 0.5px;">
                        Reset My Password
                    </a>
                </div>
                <p style="color: #888; font-size: 13px; line-height: 1.6;">
                    If the button above doesn't work, copy and paste the link below into your browser:
                </p>
                <p style="background: #f3f4f6; padding: 10px 14px; border-radius: 6px; word-break: break-all; font-size: 12px; color: #555;">
                    ${resetUrl}
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                <p style="color: #aaa; font-size: 12px; text-align: center; margin: 0;">
                    If you did not request a password reset, please ignore this email.<br/>
                    Your password will remain unchanged.
                </p>
            </div>
        </div>
    `;

    const msg = {
        to: toEmail,
        from: fromAddress, // Must be a verified sender in SendGrid
        subject: '🔐 Reset Your ShadowLearn Password',
        html: htmlBody,
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Password reset email sent via SendGrid to ${toEmail}`);
        return { success: true, method: 'sendgrid' };
    } catch (error) {
        const detail = error.response?.body?.errors?.[0]?.message || error.message;
        console.error(`❌ SendGrid error: ${detail}`);
        throw new Error(`SendGrid failed to send email: ${detail}`);
    }
};

module.exports = { sendPasswordResetEmail };
