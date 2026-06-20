# GST Calculator

A modern full-stack GST Calculator built using the MERN Stack. This application allows users to calculate GST, reverse GST, view CGST/SGST breakdowns, and store calculation history in MongoDB.

## Live Demo

Add your deployed Vercel URL here:

https://gst-calculater-five.vercel.app

## GitHub Repository

https://github.com/Pratham-3191/Gst-calculater

---

## Features

### GST Addition Calculator

- Calculate GST amount instantly
- Supports GST rates:
  - 3%
  - 5%
  - 12%
  - 18%
  - 28%
- Displays:
  - Base Amount
  - GST Amount
  - Total Amount

### Reverse GST Calculator

- Calculate original amount from GST-inclusive amount
- Displays:
  - Original Amount
  - GST Amount

### CGST & SGST Breakdown

- Automatic tax split display
- Example:
  - 18% GST → 9% CGST + 9% SGST

### Calculation History

- Saves calculations to MongoDB
- Displays recent calculations
- Tracks:
  - Calculation Type
  - Amount
  - GST Rate
  - Result
  - Date & Time

### Additional Features

- Real-time calculations
- Copy results to clipboard
- Input validation
- Mobile responsive UI
- FAQ section
- Modern SaaS-inspired design

---

## Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---
