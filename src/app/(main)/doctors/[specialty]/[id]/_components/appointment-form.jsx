"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Loader2,
  Clock,
  ArrowLeft,
  Calendar,
  CreditCard,
} from "lucide-react";
import { bookAppointment } from "@/actions/appointments";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

export function AppointmentForm({ doctorId, slot, onBack, onComplete }) {
  const [description, setDescription] = useState("");
  const { loading, data, fn: submitBooking } = useFetch(bookAppointment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("doctorId", doctorId);
    formData.append("startTime", slot.startTime);
    formData.append("endTime", slot.endTime);
    formData.append("description", description);

    await submitBooking(formData);
  };

  useEffect(() => {
    if (data && typeof data === "object") {
      if (data.success) {
        toast.success("Appointment booked successfully!");
        onComplete?.();
      } else {
        toast.error(data.message || "Failed to book appointment.");
      }
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Slot Summary */}
      <div className="bg-pink-200 backdrop-blur-md p-4 rounded-xl border border-white/20 space-y-3 shadow-sm">
        <div className="flex items-center text-black">
          <Calendar className="h-5 w-5 text-black mr-2" />
          <span className="font-semibold">
            {format(new Date(slot.startTime), "EEEE, MMMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center text-black">
          <Clock className="h-5 w-5 text-black mr-2" />
          <span>{slot.formatted}</span>
        </div>
        <div className="flex items-center text-black/80">
          <CreditCard className="h-5 w-5 text-black mr-2" />
          <span className="text-sm">
            Cost: <span className="text-black font-medium">2 credits</span>
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-black">
          Describe your medical concern <span className="text-black/50">(optional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Mention your symptoms, issues, or concerns to help the doctor prepare..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-pink-200 border border-white/20 text-black placeholder:text-black/50 h-32"
        />
        <p className="text-sm text-black/60">
          This will be shared securely with the doctor before the session.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="border-purple-300 text-black hover:bg-purple-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Change Time Slot
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-black"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>
    </form>
  );
}
