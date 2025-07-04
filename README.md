# 🩺 NovaCare – AI-Powered Doctor Appointment Platform

**NovaCare** is a full-stack medical appointment and consultation platform that streamlines patient–doctor interaction with modern tools and AI. It features distinct user roles for **Patients**, **Doctors**, and **Admins**, supports **AI-driven symptom analysis using Gemini API**, and offers **real-time video consultations** with secure authentication and a custom UI.

## 🌟 Key Features

### 👨‍⚕️ For Patients
- 🧠 **AI Symptom Analyzer (Gemini)** – Enter symptoms and receive instant, intelligent suggestions on probable causes and doctor specialties
- 📅 **Book Appointments** – Search doctors by specialization, availability, and location
- 🎥 **Video Consultations** – Secure and smooth virtual calls using Vonage API
- 💬 **Live Chat Support** – Integrated support system for resolving queries
- 📜 **Appointment History** – View and manage upcoming and previous appointments

### 🩺 For Doctors
- 👁️ **Dashboard Overview** – View and manage booked consultations
- ✍️ **Add Notes & Diagnoses** – Update each patient's consultation records
- 🕒 **Manage Availability** – Set up weekly schedules and control booking slots

### 🛠️ For Admins
- 👥 **User Management** – View, add, or block doctors and patients
- 📊 **Analytics Dashboard** – Track platform usage, appointment trends, and doctor activity
- 🔧 **System Configuration** – Manage specialties, FAQs, platform settings

---

## 🛠️ Tech Stack

| Tech            | Role                                           |
|-----------------|------------------------------------------------|
| **Next.js**     | Full-stack framework (SSR, routing, APIs)      |
| **Supabase**    | Realtime Postgres DB & auth backend            |
| **Prisma**      | ORM for database modeling                      |
| **Clerk**       | Authentication, roles, session management      |
| **Gemini API**  | AI-powered symptom analysis                    |
| **Vonage API**  | Secure video consultations                     |
| **TailwindCSS** | Utility-first modern UI framework              |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/devdeep2006/NovaCare.git
cd NovaCare
