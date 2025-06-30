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
    initials: "MS",
    name: "Meera S.",
    role: "Patient",
    quote:
      "The AI Symptom Analyzer is a game-changer! It gave me a clear direction on my mild symptoms, helping me decide if I needed a doctor or just rest. So helpful!",
  },
  {
    initials: "DS",
    name: "Dr. Sneha S.",
    role: "Dermatologist",
    quote:
      "The platform allows me to maintain a better work-life balance while still providing care to my patients across different cities.",
  },
  {
    initials: "AL",
    name: "Aisha L.",
    role: "Patient",
    quote:
      "I was unsure about my headache, so I tried the AI tool. It was incredibly easy to use and gave me peace of mind with its clear guidance.",
  },
];

// JSON data for credit system benefits
export const creditBenefits = [
  "A single consultation requires only <strong class='text-purple-600'>2 credits</strong>, for any length of time",
  "Your valuable credits <strong class='text-purple-600'>remain active indefinitely</strong> – utilize them on your schedule",
  "Subscribers on monthly plans receive <strong class='text-purple-600'>fresh credits monthly</strong>",
  "Manage your plan with complete freedom; <strong class='text-purple-600'>cancel or modify anytime</strong> at no extra cost",
];
