import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// JSON data for features
export const features = [
  {
    icon: <User className="h-6 w-6 text-purple-600" />,
    title: "Set Up Your Profile",
    description:
      "Join in seconds and build your profile to receive personalized care and recommendations.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-purple-600" />,
    title: "Seamless Appointment Booking",
    description:
      "Find doctors, view their availability, and schedule visits that work for you.",
  },
  {
    icon: <Video className="h-6 w-6 text-purple-600" />,
    title: "Instant Video Consultations",
    description:
      "Connect with trusted doctors via secure, high-quality video calls from anywhere.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-purple-600" />,
    title: "Flexible Credit System",
    description:
      "Buy credit packs or subscribe monthly—your health, your way, with no hidden fees.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-purple-600" />,
    title: "Only Verified Doctors",
    description:
      "We verify every healthcare provider to ensure you receive expert, reliable care.",
  },
  {
    icon: <FileText className="h-6 w-6 text-purple-600" />,
    title: "Access Your Medical Records",
    description:
      "Securely view consultation notes, prescriptions, and visit history anytime.",
  },
];

// JSON data for testimonials
export const testimonials = [
  {
    initials: "SJ",
    name: "Saraya J.",
    role: "Patient",
    quote:
      "I love how easy it is to consult a doctor from home. No traffic, no waiting rooms—just quick and effective advice when I need it.",
  },
  {
    initials: "DR",
    name: "Dr. Ashok M.",
    role: "Cardiologist",
    quote:
      "Thanks to this platform, I can support my patients more efficiently. It’s expanded my reach and allowed for better follow-ups.",
  },
  {
    initials: "HT",
    name: "Harshit T.",
    role: "Patient",
    quote:
      "The credit model is brilliant. I got a Premium pack and now we all have access to great care without worrying about individual payments.",
  },
  {
    initials: "AN",
    name: "Ananya N.",
    role: "Patient",
    quote:
      "Booking an appointment was so smooth! I found a specialist, scheduled a time, and got connected—all within minutes.",
  },
  {
    initials: "DS",
    name: "Dr. Sneha S.",
    role: "Dermatologist",
    quote:
      "The platform allows me to maintain a better work-life balance while still providing care to my patients across different cities.",
  },
  {
    initials: "RK",
    name: "Rohit K.",
    role: "Patient",
    quote:
      "Having all my prescriptions and doctor notes in one place makes follow-ups easier. It really simplifies my health management.",
  },
];

// JSON data for credit system benefits
export const creditBenefits = [
  "Each consultation requires <strong class='text-purple-600'>2 credits</strong>, no matter how long it lasts",
  "Your credits <strong class='text-purple-600'>never expire</strong> — use them whenever needed",
  "Monthly plans give you <strong class='text-purple-600'>new credits every month</strong>",
  "You can cancel or change plans <strong class='text-purple-600'>anytime</strong> without extra charges",
];
