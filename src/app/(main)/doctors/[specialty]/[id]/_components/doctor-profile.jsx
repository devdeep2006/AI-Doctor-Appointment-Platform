"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  Medal,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SlotPicker } from "./slot-picker";
import { AppointmentForm } from "./appointment-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { motion, AnimatePresence } from "framer-motion";

export function DoctorProfile({ doctor, availableDays }) {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const router = useRouter();

  const totalSlots = availableDays?.reduce(
    (total, day) => total + day.slots.length,
    0
  );

  const toggleBooking = () => {
    setShowBooking(!showBooking);
    if (!showBooking) {
      setTimeout(() => {
        document.getElementById("booking-section")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingComplete = () => {
    router.push("/appointments");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Doctor Photo & Quick Info */}
      <div className="md:col-span-1">
        <div className="md:sticky md:top-24">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Card className="bg-blue-29 backdrop-blur-md border border-black/20 shadow-md rounded-2xl">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-purple-800/20 border border-purple-600/30">
                    {doctor.imageUrl ? (
                      <Image
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-16 w-16 text-black" />
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-black mb-1">
                    Dr. {doctor.name}
                  </h2>

                  <Badge
                    variant="outline"
                    className="bg-purple-500/10 border-purple-400/30 text-black mb-4"
                  >
                    {doctor.specialty}
                  </Badge>

                  <div className="flex items-center justify-center mb-2">
                    <Medal className="h-4 w-4 text-black mr-2" />
                    <span className="text-black/60">
                      {doctor.experience} years experience
                    </span>
                  </div>

                  <Button
                    onClick={toggleBooking}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-black font-semibold transition-all mt-4"
                  >
                    {showBooking ? (
                      <>
                        Hide Booking
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Book Appointment
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Details + Booking */}
      <div className="md:col-span-2 space-y-6">
        <Card className="bg-black/10 backdrop-blur-md border border-black/20 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black">
              About Dr. {doctor.name}
            </CardTitle>
            <CardDescription className="text-black/50">
              Professional background and expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-black" />
                <h3 className="text-black font-medium">Description</h3>
              </div>
              <p className="text-black/60 whitespace-pre-line">
                {doctor.description}
              </p>
            </div>

            <Separator className="bg-black/10" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-black" />
                <h3 className="text-black font-medium">Availability</h3>
              </div>
              {totalSlots > 0 ? (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-black mr-2" />
                  <p className="text-black/60">
                    {totalSlots} time slots available over the next 4 days
                  </p>
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No available slots for the next 4 days. Please check back
                    later.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Booking Section */}
        <AnimatePresence>
          {showBooking && (
            <motion.div
              id="booking-section"
              key="booking-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Card className="bg-black/10 backdrop-blur-md border border-black/20 shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-black">
                    Book an Appointment
                  </CardTitle>
                  <CardDescription className="text-black/50">
                    Select a time slot and provide your details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {totalSlots > 0 ? (
                    <AnimatePresence mode="wait">
                      {!selectedSlot ? (
                        <motion.div
                          key="slot-picker"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SlotPicker
                            days={availableDays}
                            onSelectSlot={handleSlotSelect}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="appointment-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AppointmentForm
                            doctorId={doctor.id}
                            slot={selectedSlot}
                            onBack={() => setSelectedSlot(null)}
                            onComplete={handleBookingComplete}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-12 w-12 mx-auto text-black/50 mb-3" />
                      <h3 className="text-xl font-medium text-black mb-2">
                        No available slots
                      </h3>
                      <p className="text-black/60">
                        This doctor doesn&apos;t have any available appointment
                        slots for the next 4 days. Please check back later or
                        try another doctor.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
