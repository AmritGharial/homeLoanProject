const nodemailer = require("nodemailer");
const fs = require("fs");

async function sendEmailReport() {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // Use 587 for TLS
        secure: true, // True for 465, false for 587
        auth: {
            user: "pgoelallego@gmail.com",
            pass: "vtvanepshqnqocdj" // Use App Password for Gmail
        }
    });

    // Attach the Allure report ZIP
    const mailOptions = {
        from: "pgoelallego@gmail.com",
        to: "a.gharial9988@gmail.com",
        subject: "Allure Test Report",
        html: `<p>Please find the <a href="https://amritgharial.github.io/homeLoanProject/allure-report/" target="_blank">Allure Test Report</a>.</p>`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Run the function
sendEmailReport();
