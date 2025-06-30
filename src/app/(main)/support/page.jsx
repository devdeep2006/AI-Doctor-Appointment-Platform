"use client";

import { useState } from "react";
import {
  ChevronDown,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-pink-200 last:border-b-0">
      <button
        className="w-full py-6 px-2 text-left hover:bg-pink-50 rounded-xl transition-all duration-200"
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-purple-700 group-hover:text-purple-900 transition-all duration-200">
            {question}
          </h3>
          <ChevronDown
            className={`w-5 h-5 text-purple-500 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 pt-2" : "max-h-0"
        }`}
      >
        <p className="text-gray-700 text-base leading-relaxed bg-purple-50/40 rounded-xl px-4 py-3 border border-purple-100 shadow-sm">
          {answer}
        </p>
      </div>
    </div>
  );
};

const ContactOption = ({ icon: Icon, title, subtitle, action, variant }) => {
  const variants = {
    primary: "hover:bg-blue-50 hover:border-blue-200 focus:ring-blue-500",
    secondary: "hover:bg-green-50 hover:border-green-200 focus:ring-green-500",
    tertiary: "hover:bg-purple-50 hover:border-purple-200 focus:ring-purple-500",
  };

  const iconVariants = {
    primary: "text-blue-600 bg-blue-100",
    secondary: "text-green-600 bg-green-100",
    tertiary: "text-purple-600 bg-purple-100",
  };

  return (
    <button
      className={`group w-full p-8 rounded-xl border border-gray-200 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]}`}
      onClick={action}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`p-3 rounded-full transition-colors ${iconVariants[variant]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </button>
  );
};

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I book a consultation?",
      answer:
        "Navigate to the Doctors page, browse through our qualified physicians, select your preferred doctor, and click 'Book Appointment'. Choose your preferred time slot and confirm your booking.",
    },
    {
      question: "Can I reschedule an appointment?",
      answer:
        "As of now you can't do that but you can cancel your appointmnet and  select a new time slot that works for you.",
    },
    {
      question: "What if my doctor misses the call?",
      answer:
        "Don't worry! If your doctor misses the scheduled call, you can either request an immediate reschedule or contact our support team for a full refund. We ensure you get the care you deserve.",
    },
    {
      question: "How do I join a video consultation?",
      answer:
        "You'll receive a consultation joining option 30 mins before the meeting. You will also recieve notificationvia email and SMS before your appointment. ",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our encrypted payment gateway.",
    },
    {
      question: "Can I get my prescription after the consultation?",
      answer:
        "Yes! After your consultation, your doctor will add the digital prescription into the notes section of your appointment",
    },
  {
  question: "What is the AI Symptom Analyzer?",
  answer:
    "Our AI Symptom Analyzer is a tool designed to help you understand potential health conditions based on the symptoms you describe. It uses an extensive database of medical knowledge and artificial intelligence to provide preliminary assessments and suggest possible next steps.",
  },
  {
    question: "Is the AI Symptom Analyzer a substitute for a doctor's visit?",
    answer:
      "No, the AI Symptom Analyzer is not a diagnostic tool and should not be used as a substitute for professional medical advice, diagnosis, or treatment. It's designed to provide informative insights and guidance, but always consult with a qualified healthcare professional for any health concerns.",
  },
  {
    question: "How accurate is the AI Symptom Analyzer?",
    answer:
      "The AI Symptom Analyzer leverages a vast and continuously updated medical database, making its insights highly reliable for preliminary assessment. However, its accuracy depends on the completeness and clarity of the information you provide. It's a tool for guidance, not a definitive diagnosis.",
  },
  {
    question: "What kind of information do I need to provide to the Symptom Analyzer?",
    answer:
      "To get the most accurate insights, you should provide a clear and detailed description of your symptoms, including when they started, how severe they are, any accompanying symptoms, and factors that make them better or worse. The more information you provide, the better the analyzer can assist you.",
  },
  {
    question: "Is my personal health information secure with the AI Symptom Analyzer?",
    answer:
      "Yes, we prioritize your privacy and data security. All information you provide to the AI Symptom Analyzer is handled with the utmost confidentiality and is encrypted to protect your personal health information in accordance with privacy regulations.",
  },
  {
    question: "Can the AI Symptom Analyzer help me find a doctor?",
    answer:
      "While its primary function is symptom analysis, the analyzer can often suggest types of specialists or medical services that might be relevant based on its findings. Some versions may even integrate with our appointment booking system to help you find and schedule consultations with healthcare professionals.",
  },
  ];

  const handleEmailClick = () => {
    window.location.href = "mailto:support@novacare.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleChatClick = () => {
    console.log("Opening live chat...");
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #ffe4e6 0%, #fcd5ce 40%, #fff1f2 100%)" }}>
      <div className="relative bg-gradient-to-r from-pink-100 via-pink-200 to-rose-100 text-black">
        <div className="absolute top-6 left-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium border bg-white border-blue-600 text-blue-600 hover:bg-purple-100 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/30 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-pink-400 to-purple-600 mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-black max-w-2xl mx-auto">
            We're here to help you get the most out of NovaCare. Find answers
            to common questions or reach out to our support team.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        <Card className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-xl rounded-3xl">
          <CardHeader className="text-center pb-8 px-6 sm:px-12">
            <CardTitle className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 mb-4">
              Frequently Asked Questions
            </CardTitle>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Here are answers to some of the most common questions our users ask.
            </p>
          </CardHeader>
          <CardContent className="px-6 sm:px-12 pb-12 divide-y divide-pink-200">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50/50 shadow-lg border border-gray-200 backdrop-blur-sm">
          <CardHeader className="text-center pb-10 px-12">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
              Still Need Help?
            </CardTitle>
            <p className="text-lg text-gray-600">
              Our dedicated support team is available 24/7 to assist you
            </p>
          </CardHeader>
          <CardContent className="px-12 pb-12">
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <ContactOption icon={Mail} title="Email Support" subtitle="support@novacare.com" action={handleEmailClick} variant="primary" />
              <ContactOption icon={Phone} title="Phone Support" subtitle="+91 98765 43210" action={handlePhoneClick} variant="secondary" />
              <ContactOption icon={MessageSquare} title="Live Chat" subtitle="Chat with us now" action={handleChatClick} variant="tertiary" />
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-orange-50/30 rounded-xl p-8">
              <div className="flex items-center justify-center mb-6">
                <Clock className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-900 text-lg">Average Response Times</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="font-medium text-blue-600 mb-1 text-base">Email</div>
                  <div className="text-gray-600">Within 2 hours</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-green-600 mb-1 text-base">Phone</div>
                  <div className="text-gray-600">Immediate</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-purple-600 mb-1 text-base">Live Chat</div>
                  <div className="text-gray-600">Under 1 minute</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
