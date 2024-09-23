import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


// Configure the Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail as the service, but you can change it to others (e.g., SendGrid)
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address from .env
    pass: process.env.GMAIL_PASS, // Your Gmail app password from .env
  },
});

 console.log(process.env.GMAIL_USER);
 export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { lookingFor, rentData, buyData } = body;

    let emailContent = "";
    let subject = "";

    if (lookingFor === "rent" && rentData) {
      subject = `Property Enquiry (Rent) from ${rentData.name}`;
      emailContent = `
        <h2>Rent Property Enquiry</h2>
        <p><strong>Name:</strong> ${rentData.name}</p>
        <p><strong>Phone:</strong> ${rentData.phone}</p>
        <p><strong>Email:</strong> ${rentData.email}</p>
        <p><strong>Property Type:</strong> ${rentData.propertyType}</p>
        <p><strong>Duration:</strong> ${rentData.duration}</p>
      `;
    } else if (lookingFor === "buy" && buyData) {
      subject = `Property Enquiry (Buy) from ${buyData.location}`;
      emailContent = `
        <h2>Buy Property Enquiry</h2>
        <p><strong>Location:</strong> ${buyData.location}</p>
        <p><strong>Property Type:</strong> ${buyData.propertyType}</p>
        <p><strong>Budget:</strong> ${buyData.budget}</p>
      `;
    } else {
      throw new Error("Invalid data received");
    }

    console.log("Email content:", emailContent);

    const mailOptions = {
      from: `"Property Enquiry" <${process.env.GMAIL_USER}>`,
      to: "aayushtirmanwar1234@gmail.com",
      subject: subject,
      html: emailContent,
    };

    console.log("Sending email with options:", mailOptions);

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return NextResponse.json({ message: "Email sent successfully", content: emailContent }, { status: 200 });
  } catch (error : any) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to send email.", details: error.message }, { status: 500 });
  }
}