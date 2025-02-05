# Authentication Form Project

This project is a full-stack authentication system built with React for the frontend and Node.js/Express for the backend. It features a complete user authentication flow including:

- **Signup Page:** New users can create an account.
- **Signin Page:** Existing users can log in.
- **Forgot Password Page:** Users can request a password reset if they forget their password.
- **Reset Password Page:** Users can reset their password using an OTP sent to their email.
- **Email OTP Verification:** The backend sends a one-time password (OTP) to the user's email using Nodemailer for secure password reset.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Registration:** Easy signup with secure data handling.
- **User Login:** Authentication with proper validation.
- **Password Recovery:** Forgot password functionality with OTP verification.
- **Email Integration:** Uses Nodemailer to send OTP to users.
- **Secure Password Reset:** Users can securely reset their passwords after OTP verification.
- **Responsive Design:** A user-friendly interface built with React.

## Technologies Used

- **Frontend:** React, HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Email Service:** Nodemailer
- **Other Tools:** Git, npm/yarn

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v12+ recommended)
- An email account for Nodemailer configuration

### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/authentication-form.git
   cd authentication-form/backend
Install Dependencies:

bash
Copy
Edit
npm install
Configure Environment Variables:

Create a .env file in the backend folder and add your configuration. Example:
env
Copy
Edit
PORT=5000
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your_email_password
Adjust the settings based on your email provider.
Start the Backend Server:

bash
Copy
Edit
npm start
Frontend Setup
Navigate to the Frontend Directory:

bash
Copy
Edit
cd ../frontend
Install Dependencies:

bash
Copy
Edit
npm install
Start the React Application:

bash
Copy
Edit
npm start
Usage
Access the Frontend:

Open your browser and navigate to http://localhost:3000 to access the authentication interface.
User Flow:

Sign Up: New users can create an account by filling out the signup form.
Sign In: Registered users can log in through the signin page.
Forgot Password: If a user forgets their password, they can request an OTP via the forgot password page.
Reset Password: After receiving the OTP via email, the user can enter it on the reset password page to set a new password.
Email OTP Process:

When a user requests a password reset, the backend generates an OTP and sends it to the registered email using Nodemailer.
The user then uses the OTP to verify their identity and proceed with resetting their password.
Project Structure
pgsql
Copy
Edit
authentication-form/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   └── nodemailer.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    ├── .env
    └── package.json
Contributing
Contributions are welcome! If you’d like to contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.
Ensure your code follows our style guidelines and includes relevant tests.
