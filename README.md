# 📩 SMS-to-Email Gateway via Twilio & Node.js

This Node.js application allows you to **send an email through SMS** using a **Twilio webhook**. When a user sends an SMS to a configured Twilio number using a specific pattern, the app will parse the SMS and forward it as an email using Nodemailer.

---

## ✨ Features

-   Receive SMS via Twilio
-   Parse SMS content for email structure
-   Send email using Gmail (via Nodemailer)
-   Simple webhook-based API
-   Great for sending emails even without internet (just using mobile SMS)

---

## 📥 SMS Format

To send an email, write the SMS message in this exact pattern:

```
EMAILTO: recipient@example.com
SUBJECT: Your subject here
BODY: This is the body of the email.
```

Each section must appear in order and start with the correct keyword (`EMAILTO:`, `SUBJECT:`, `BODY:`).

---

## ⚙️ Tech Stack

-   Node.js
-   Express.js
-   Nodemailer
-   Twilio Webhooks
-   Gmail (App Password)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MdReyadHossain/twilio-sms-to-email.git
cd twilio-sms-to-email
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file:

```env
GMAIL_USER=yourgmail@gmail.com
GMAIL_PASS=your_app_password
```

> 💡 Use an [App Password](https://myaccount.google.com/apppasswords) for Gmail (do not use your regular password).

---

### 4. Start the Server

```bash
npm run start
```

> Uses `nodemon` to auto-restart the server on code changes.

---

## 📡 Connect to Twilio

### Step 1: Buy a phone number (if you don't have one already)

### Step 2: Set your Twilio webhook URL

Go to your Twilio Console → **Phone Numbers** → your number → **Messaging** section.

-   **Messaging webhook URL**:

    ```
    https://your-server.com/sms
    ```

    Or use [ngrok](https://ngrok.com/) for testing:

    ```
    https://your-ngrok-url.ngrok.io/sms
    ```

-   Set **HTTP POST** method.

---

## 🔄 Sample Request via Twilio

When Twilio receives an SMS to your number like:

```
EMAILTO: test@example.com
SUBJECT: Hello
BODY: Just checking in!
```

The server will:

-   Parse the message
-   Send an email to `test@example.com` with subject "Hello" and the body "Just checking in!"

---

## 🧪 Local Testing (Optional)

You can test without Twilio using curl:

```bash
curl -X POST http://localhost:3000/sms \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "Body=EMAILTO:test@example.com SUBJECT:Hello BODY:This is a test"
```

---

## 📁 Project Structure

```
.
├── server.js         # Main server file
├── .env              # Environment variables
├── package.json      # Project configuration
└── README.md         # You're here
```

---

## 🤝 Contributing

PRs welcome! If you find any bug or want to add features, feel free to open an issue or submit a pull request.

---

## 🛡️ License

MIT License. Use freely, modify, and share.

---

## 🙌 Acknowledgements

-   [Twilio](https://www.twilio.com/)
-   [Nodemailer](https://nodemailer.com/about/)
-   [Express](https://expressjs.com/)
