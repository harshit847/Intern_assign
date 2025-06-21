import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/send-enquiry', async (req, res) => {
    const { name, type, description, userEmail } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "caad81989ac74f",
                pass: "28932aed4c4b64"
            }
        });

        const mailOptions = {
            from: userEmail || "test@demo.com",
            to: "studyhub110@gmail.com",
            subject: `New Enquiry for ${name}`,
            text: `Item: ${name}\nType: ${type}\nDescription: ${description}\nUser Email: ${userEmail}`,
        };

        await transporter.sendMail(mailOptions); 
        res.status(200).json({ message: "Enquiry sent!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to send enquiry" });
    }
});

export default router;
