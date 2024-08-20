const nodemailer = require("nodemailer");
const SubmissionModel = require("../model/submissionModel")

const sendMarkMail = async (email, latestMark) => {
    try {
        let mailer = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            }
        });

        const response = await mailer.sendMail({
            from: '"Cypher School" <cipher-school@gmail.com>',
            to: email,
            subject: "Your Result",
            html: `
            <html>
                <body>
                    <h1>You have Scored : ${latestMark}</h1>
                    <h2>Keep Learning , Keep Growing</h2>
                </body>
            </html>`,
        });

        return response.messageId ? true : false;

    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

const sendLatestMark = async (req, res) => {
    try {
        const { email, _id } = req.user;

        
        const user = await SubmissionModel.findById(_id).select("marks").exec();
        if (!user || !user.marks || user.marks.length === 0) {
            return res.status(404).json({ status: "fail", message: "No marks found for this user" });
        }

        const latestMark = user.marks[user.marks.length - 1];

        const isMailSent = await sendMarkMail(email, latestMark);

        if (!isMailSent) {
            return res.status(500).json({ status: "fail", message: `Mark not sent to ${email}` });
        }

        res.status(200).json({ status: "success", message: `Latest mark sent to ${email}` });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "fail", message: "Internal server error", error: error.message });
    }
};

module.exports = { sendLatestMark, sendMarkMail };
