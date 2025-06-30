"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Stethoscope, Heart, Shield, Brain, Star, Users, Sparkles } from "lucide-react"
// Change these to relative imports:
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "@/components/ui/badge"
import { creditBenefits, testimonials } from "../lib/data" // Fixed: @lib/data -> ../lib/data
import { motion } from "framer-motion"
import Pricing from "@/components/pricing"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf0] via-[#ffe4e1] to-[#ffecd2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-[#fff9f5] via-[#fff0f0] to-[#ffece0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image first on large screens */}
            <motion.div
              className="relative h-[450px] lg:h-[600px] rounded-3xl overflow-hidden order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/60 to-purple-50/40 rounded-3xl opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/3 to-transparent rounded-3xl" />
              <Image
                src="/banner.png"
                alt="Doctor consultation"
                fill
                priority
                className="object-contain rounded-3xl p-8"
              />
              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-2xl"
                animate={{ y: [-10, 10, -10], rotate: [0, 90, 180] }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{
                  animation: "pulse 4s ease-in-out infinite",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-100/20 to-pink-100/15 rounded-full blur-xl"
                animate={{ y: [10, -10, 10], rotate: [180, 90, 0] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{
                  animation: "pulse 4s ease-in-out infinite",
                }}
              />
            </motion.div>

            {/* Text content second */}
            <div className="space-y-10 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-white/90 via-blue-50/80 to-purple-50/70 border-slate-200/40 px-10 py-4 text-slate-700 text-base font-semibold rounded-full shadow-sm backdrop-blur-sm"
                >
                  ✨ Elegant Healthcare Experience
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                Caring Healthcare for You
              </h2>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <p className="text-slate-700 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium">
                  Experience healthcare with warmth and compassion. Our platform connects you with caring doctors,analyse your illness based on the symptoms
                  making your wellness journey comfortable and accessible.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full px-12 py-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-400 transform hover:scale-105 border-0"
                >
                  <Link href="/onboarding">
                    Begin Your Journey <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-gradient-to-r from-white/95 via-blue-50/80 to-purple-50/70 border-2 border-slate-200/60 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50/90 hover:via-purple-50/80 hover:to-pink-50/70 hover:border-slate-300/70 rounded-full px-12 py-8 text-lg font-semibold transition-all duration-400 shadow-sm hover:shadow-lg backdrop-blur-sm"
                >
                  <Link href="/doctors">Meet Our Doctors</Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex flex-wrap gap-8 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                {[
                  { icon: <Users className="h-5 w-5" />, value: "25K+", label: "Happy Patients" },
                  { icon: <Heart className="h-5 w-5" />, value: "500+", label: "Caring Doctors" },
                  { icon: <Star className="h-5 w-5" />, value: "4.9", label: "Trust Rating" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-white/90 to-blue-50/60 rounded-lg text-blue-600 shadow-sm border border-slate-100/50">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                      <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Background elements */}
        <motion.div
          className="absolute top-32 right-32 w-40 h-40 bg-gradient-to-br from-blue-100/20 via-purple-100/15 to-pink-100/10 rounded-full blur-3xl opacity-30"
          animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-br from-purple-100/15 via-pink-100/10 to-blue-100/20 rounded-full blur-2xl opacity-25"
          animate={{ y: [15, -15, 15], x: [5, -5, 5] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </section>
<section className="py-12 bg-gradient-to-br from-indigo-50/30 via-purple-50/40 via-pink-50/30 to-white/70">
  <div className="container mx-auto px-4">
    <Card className="bg-gradient-to-br from-white/95 via-indigo-50/40 via-purple-50/30 to-pink-50/20 border border-slate-200/40 shadow-lg backdrop-blur-sm overflow-hidden">
      <CardContent className="p-12 md:p-16 lg:p-20 relative">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16"> {/* This class places the image on the right on large screens */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }} /* Animation for image from right */
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="/symptom.png"
              alt="AI Symptom Analyzer Illustration"
              className="rounded-3xl shadow-lg w-full h-auto object-cover transition-all duration-700 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white/90 to-blue-50/50 p-4 border border-slate-100/50"
            />
          </motion.div>

          <motion.div
            className="max-w-2xl w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }} /* Animation for text from left */
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-8 leading-tight">
              Unlock Insights with our{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
                AI Symptom Analyzer
              </span>
            </h2>
            <p className="text-xl text-slate-700 mb-10 leading-relaxed font-medium">
              Curious about your symptoms? Our advanced AI Symptom Analyzer provides instant, data-driven insights to help you understand potential health conditions. Simply describe what you're feeling, and our intelligent system, powered by extensive medical knowledge, will guide you with preliminary assessments and suggest appropriate next steps, empowering you to make informed decisions about your health.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full px-12 py-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-400 transform hover:scale-105 border-0"
              >
                <Link href="/prediction">Try Our Symptom Analyzer</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-white/95 via-indigo-50/70 to-purple-50/60 border-2 border-slate-200/60 text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50/80 hover:via-purple-50/70 hover:to-pink-50/60 hover:border-slate-300/70 rounded-full px-12 py-8 text-lg font-semibold transition-all duration-400 shadow-sm hover:shadow-lg backdrop-blur-sm"
              >
                <Link href="/support">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Background elements */}
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-indigo-100/15 via-purple-100/10 to-pink-100/8 rounded-full blur-3xl opacity-40 -mr-20 -mt-20" />
        <div className="absolute left-0 bottom-0 w-[250px] h-[250px] bg-gradient-to-br from-purple-100/10 via-pink-100/8 to-indigo-100/15 rounded-full blur-2xl opacity-30 -ml-16 -mb-16" />
        <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-gradient-to-br from-white/20 via-blue-50/10 to-purple-50/8 rounded-full blur-2xl opacity-25 -translate-x-1/2 -translate-y-1/2" />
      </CardContent>
    </Card>
  </div>
</section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-white/90 via-green-50/30 via-blue-50/20 to-purple-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-white/95 via-green-50/70 to-blue-50/60 border-slate-200/40 px-14 py-5 text-base text-slate-700 font-semibold mb-8 rounded-full shadow-md backdrop-blur-sm"
            >
              🌸 Thoughtful Features
            </Badge>

            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-8">Care by Design</h2>
            <p className="text-slate-700 text-xl max-w-4xl mx-auto leading-relaxed font-medium">
              Every feature crafted with intention, designed to make your healthcare experience warm and nurturing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-rose-500" />,
                title: "Compassionate Care",
                description: "Healthcare delivered with empathy and genuine understanding",
                gradient: "from-rose-50/60 to-pink-50/40",
                cardBg: "from-white/95 via-rose-50/50 to-pink-50/30",
                border: "border-rose-100/60",
                textColor: "text-rose-800",
                descColor: "text-rose-700",
              },
              {
                icon: <Brain className="h-10 w-10 text-purple-500" />,
                title: "Smart Guidance",
                description: "Thoughtful recommendations tailored to your wellness journey",
                gradient: "from-purple-50/60 to-indigo-50/40",
                cardBg: "from-white/95 via-purple-50/50 to-indigo-50/30",
                border: "border-purple-100/60",
                textColor: "text-purple-800",
                descColor: "text-purple-700",
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-500" />,
                title: "Secure & Private",
                description: "Your health data protected with the utmost care and discretion",
                gradient: "from-blue-50/60 to-cyan-50/40",
                cardBg: "from-white/95 via-blue-50/50 to-cyan-50/30",
                border: "border-blue-100/60",
                textColor: "text-blue-800",
                descColor: "text-blue-700",
              },
              {

                icon: <Sparkles className="h-10 w-10 text-emerald-500" />,
                title: "Warm Experience",
                description: "A welcoming platform designed for your comfort and peace",
                gradient: "from-emerald-50/60 to-green-50/40",
                cardBg: "from-white/95 via-emerald-50/50 to-green-50/30",
                border: "border-emerald-100/60",
                textColor: "text-emerald-800",
                descColor: "text-emerald-700",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card
                  className={`bg-gradient-to-br ${feature.cardBg} border ${feature.border} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 h-full group cursor-pointer backdrop-blur-sm`}
                >
                  <CardHeader className="pb-6 text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.emoji}
                    </div>
                    <div
                      className={`bg-gradient-to-br ${feature.gradient} p-6 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-sm border border-white/50`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className={`text-xl font-bold ${feature.textColor}`}>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className={`${feature.descColor} leading-relaxed font-medium`}>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 bg-gradient-to-br from-purple-50/20 via-pink-50/30 via-orange-50/20 to-white/80"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-white/95 via-green-50/70 to-blue-50/60 border-slate-200/40 px-14 py-5 text-base text-slate-700 font-semibold mb-8 rounded-full shadow-md backdrop-blur-sm"
            >
              💝 Caring Packages
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-8">Wellness Within Reach</h2>
            <p className="text-slate-700 text-xl max-w-4xl mx-auto leading-relaxed font-medium">
              Our thoughtfully designed packages ensure that quality healthcare remains accessible and affordable
            </p>
          </motion.div>

          <motion.div
            className="mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Pricing />

            <Card className="mt-16 bg-gradient-to-br from-white/95 via-purple-50/40 to-pink-50/30 border border-slate-200/40 shadow-sm backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                  <Stethoscope className="h-8 w-8 mr-4 text-purple-500" />
                  How Our Caring Credit System Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6">
                  {creditBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="mr-6 mt-1 bg-gradient-to-br from-white/90 to-purple-50/60 p-3 rounded-full shadow-sm border border-slate-100/50">
                        <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p
                        className="text-slate-700 leading-relaxed font-medium text-lg"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-white/90 via-yellow-50/20 via-green-50/30 to-blue-50/40">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-white/95 via-green-50/70 to-blue-50/60 border-slate-200/40 px-14 py-5 text-base text-slate-700 font-semibold mb-8 rounded-full shadow-md backdrop-blur-sm"
            >
              ⭐ Heartfelt Stories
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-8">Words That Inspire Us</h2>
            <p className="text-slate-700 text-xl max-w-4xl mx-auto leading-relaxed font-medium">
              Hear from those who have experienced the warmth and care of our healthcare platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const cardColors = [
                {
                  cardBg: "from-white/95 via-yellow-50/40 to-amber-50/30",
                  border: "border-yellow-100/60",
                  avatarBg: "from-yellow-50/80 to-amber-50/60",
                  textColor: "text-amber-800",
                  descColor: "text-amber-700",
                  avatarText: "text-amber-600",
                },
                {
                  cardBg: "from-white/95 via-green-50/40 to-emerald-50/30",
                  border: "border-green-100/60",
                  avatarBg: "from-green-50/80 to-emerald-50/60",
                  textColor: "text-emerald-800",
                  descColor: "text-emerald-700",
                  avatarText: "text-emerald-600",
                },
                {
                  cardBg: "from-white/95 via-blue-50/40 to-sky-50/30",
                  border: "border-blue-100/60",
                  avatarBg: "from-blue-50/80 to-sky-50/60",
                  textColor: "text-sky-800",
                  descColor: "text-sky-700",
                  avatarText: "text-sky-600",
                },
              ]
              const colors = cardColors[index % cardColors.length]

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Card
                    className={`bg-gradient-to-br ${colors.cardBg} border ${colors.border} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 h-full backdrop-blur-sm`}
                  >
                    <CardContent className="pt-8">
                      <div className="flex items-center mb-8">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.avatarBg} flex items-center justify-center mr-6 shadow-sm border border-white/50`}
                        >
                          <span className={`${colors.avatarText} font-bold text-xl`}>{testimonial.initials}</span>
                        </div>
                        <div>
                          <h4 className={`font-bold ${colors.textColor} text-xl`}>{testimonial.name}</h4>
                          <p className={`${colors.descColor} font-medium`}>{testimonial.role}</p>
                        </div>
                      </div>
                      <p className={`${colors.descColor} leading-relaxed italic text-lg font-medium`}>
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50/30 via-purple-50/40 via-pink-50/30 to-white/70">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-white/95 via-indigo-50/40 via-purple-50/30 to-pink-50/20 border border-slate-200/40 shadow-lg backdrop-blur-sm overflow-hidden">
            <CardContent className="p-12 md:p-16 lg:p-20 relative">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="/banner2.png"
                    alt="Healthcare Consultation Illustration"
                    className="rounded-3xl shadow-lg w-full h-auto object-cover transition-all duration-700 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white/90 to-blue-50/50 p-4 border border-slate-100/50"
                  />
                </motion.div>

                <motion.div
                  className="max-w-2xl w-full lg:w-1/2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-8 leading-tight">
                    Ready to Experience{" "}
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
                      Caring Healthcare?
                    </span>
                  </h2>
                  <p className="text-xl text-slate-700 mb-10 leading-relaxed font-medium">
                    Join thousands of people who have discovered a warmer approach to healthcare. Begin your journey
                    toward wellness with compassion and care.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full px-12 py-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-400 transform hover:scale-105 border-0"
                    >
                      <Link href="/sign-up">Start Your Wellness Journey</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="bg-gradient-to-r from-white/95 via-indigo-50/70 to-purple-50/60 border-2 border-slate-200/60 text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50/80 hover:via-purple-50/70 hover:to-pink-50/60 hover:border-slate-300/70 rounded-full px-12 py-8 text-lg font-semibold transition-all duration-400 shadow-sm hover:shadow-lg backdrop-blur-sm"
                    >
                      <Link href="#pricing">Explore Care Plans</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Background elements */}
              <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-indigo-100/15 via-purple-100/10 to-pink-100/8 rounded-full blur-3xl opacity-40 -mr-20 -mt-20" />
              <div className="absolute left-0 bottom-0 w-[250px] h-[250px] bg-gradient-to-br from-purple-100/10 via-pink-100/8 to-indigo-100/15 rounded-full blur-2xl opacity-30 -ml-16 -mb-16" />
              <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-gradient-to-br from-white/20 via-blue-50/10 to-purple-50/8 rounded-full blur-2xl opacity-25 -translate-x-1/2 -translate-y-1/2" />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
