import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';

const app = express();

app.use(cors());
dotenv.config();
app.use(cookieParser());
app.use(express.json());

// Database configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((error) => {
  if (error) return console.log('Error connecting to MYSQL!', error);
  console.log('Connected to MYSQL database well!');
});

// Utility functions
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};


// Updated SMTP Configuration for Gmail
const createTransporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
    });

    // Verify the connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return transporter;
  } catch (error) {
    console.error('SMTP Configuration Error:', error);
    return null;
  }
};


// SignUp route
app.post('/SignUp', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const hashpassword = await bcrypt.hash(password, 10);
    
    const q = 'INSERT INTO tutors (email, password) VALUES (?, ?)';
    db.query(q, [email, hashpassword], (error, result) => {
      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json({ message: 'User created Successfully' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // SignIn route
  app.post('/', (req, res) => {
    const { email, password } = req.body;

    const q = 'SELECT * FROM tutors WHERE email = ?';
    db.query(q, [email], async (error, result) => {
      if (error) return res.status(500).json({ error: error.message });
      if (result.length === 0) return res.status(404).json({ error: 'User not found' });

      try {
        const isMatch = await bcrypt.compare(password, result[0].password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = generateToken(result[0].id);
        
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600000,
        });

        res.status(200).json({ message: 'Logged in successfully!' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  });

  // Updated Forgot Password Route
  app.post('/ForgotPassword', async (req, res) => {
    const { email } = req.body;

    try {
      const q = 'SELECT * FROM tutors WHERE email = ?';
      
      db.query(q, [email], async (error, result) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ error: 'Database error occurred' });
        }
        
        if (result.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }

        const otp = generateOTP();

        try {
          const transporter = await createTransporter();
          
          if (!transporter) {
            return res.status(500).json({ 
              success: false,
              error: 'Email service is temporarily unavailable'
            });
          }

          const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2>Password Reset Request</h2>
                <p>Your OTP for password reset is:</p>
                <h1 style="color: #007bff; font-size: 32px;">${otp}</h1>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request this password reset, please ignore this email.</p>
              </div>
            `
          };

          await transporter.sendMail(mailOptions);
          console.log('OTP sent to:', email);
          
          res.json({ 
            success: true,
            message: 'OTP sent to your email'
          });

        } catch (emailError) {
          console.error('Email sending error:', emailError);
          res.status(500).json({ 
            success: false,
            error: 'Failed to send email. Please try again later.'
          });
        }
      });

    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ 
        success: false,
        error: 'An unexpected error occurred'
      });
    }
  });

  app.listen(process.env.SERVER_PORT, () => {
    console.log('Listening and connected to the backend..');
  });
