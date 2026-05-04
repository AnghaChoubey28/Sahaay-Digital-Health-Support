*Sahaay – Digital Mental Health Platform
Overview

Sahaay is a student-focused mental health platform that brings together AI support, peer interaction, and professional counseling into a single system. It aims to make mental health assistance accessible, private, and easy to use within academic environments.

*Core Features
Student Dashboard
A personalized space where users can track their mental well-being and access helpful resources.
AI Assistant
A 24/7 chatbot that provides basic emotional support, guidance, and multilingual interaction.
Peer Support System
An anonymous environment where students can share experiences and connect with others safely.
Counseling Services
Enables secure booking of sessions with certified mental health professionals.
Assessment Tools
Includes standard tools such as PHQ-9 and GAD-7 for self-evaluation.
Admin Panel
Provides system control, monitoring, and insights through detailed analytics.
Mood Tracking
Allows users to log emotions and receive simple insights over time.
Analytics & Visualization
Displays real-time data through charts and summaries for better understanding.

*Technology Used
Frontend: React, Vite, SCSS, React Router
Backend: Node.js, Express
Database: MongoDB
Authentication: JWT-based system
AI Integration: Google Gemini API

 *Quick Start

**Frontend Setup

cd Frontend
npm install
npm run dev


** Backend Setup
```bash
cd Backend
npm install
npm run dev
```

** Database Setup
```bash
cd Backend
npm run seed


*Environment Variables

Create a `.env` file in the Backend directory with:
```
JWT_SECRET=your_jwt_secret_here
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```
**Data Models
User profiles for students, admins, and counselors
Appointment scheduling system
Feedback collection
Chat session records
Assessment data storage
System logs


/***API Overview
Authentication endpoints for login and registration
Appointment booking and feedback submission
AI chat handling
Analytics endpoints for trends and system monitoring

**Demo Access
Student: student@university.edu
 / admin123
Admin: admin / admin123

**Admin Capabilities
View key statistics and trends
Manage users and sessions
Monitor system performance
Analyze feedback and activity


**Application Routes
/ Landing page
/student/dashboard Student dashboard
/student/assessment Assessments
/student/support Support options
/admin Admin login
/admin/dashboard Admin analytics


**Additional Notes
Mobile-friendly design
Secure authentication system
Real-time updates in dashboard
Clean and user-focused interface

Sahaay is built to encourage early support, reduce stigma, and provide students with reliable mental health resources in one place.
