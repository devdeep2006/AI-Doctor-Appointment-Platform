"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { deductCreditsForAppointment } from "@/actions/credits";
import { Vonage } from "@vonage/server-sdk";
import { addDays, addMinutes, format, isBefore, endOfDay } from "date-fns";
import { Auth } from "@vonage/auth";

// Initialize Vonage Video API client
const credentials = new Auth({
  applicationId: process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID,
  privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjXHXYxUmhI03J
+/uj0neva3woUOkJLRzSgyBJIVGh+UCW+NPudzWAFSRLqFxNRnjwPl2emYOnzLSD
Rh/DOQzI70Yv27ceXclUVZUlO972XfCo0EEEKXSIbH3u3ng3S0k1EgCe6LqpUO+l
3T9yWEw41CyhMu0QNcZHiB0jGRkML9PkKqz+rbGGwuBzqkLN9x33zi1Nl3JEB8hY
H6mCbMTSYhAl+fmqwicsAj2E7NPZ7Yd5DzpNNB0pa2055mP3XLa1+d5o3pdUHUgw
Xb+5HHZq0WE74LiEDINlMlQD5cmR6KY4NAh5Ng7EQWNTSbQoUJqsFj7+QWA6MryG
N5MK+4FLAgMBAAECggEACC2Qmrr5qM7xzdBHCdhMnzlZcafnRUspsQzZGMAfFuWO
9bUxit5ojRJsiuW779m8zoNuFV/9sXCegsndEjKwxf2wfPnaAh5Tfgd7cW3nXLGu
4rdA4fqfTQBoEjAMmEa1Ef/mNw5TNeG0NZCiD1EwnlGvhZxdNh1dtpFaVWT5a4eE
RrQJyDzaWeilG/t1khRhYlRxby/eEKSfWGB+n1Nnchdz8lFrXA8uxaxhy7jqfoze
Qy6MrJD+EP1sfmhAyBz4c4+MZKB09JqrbOw/t3OW1PzfpxDQ85JUppPWXHEo+Yt2
wbVIWg+uu9eAijba4CP/B2XtzjooUi8L3nydv4cXGQKBgQDOJxQWp/w3OmnQ8FkS
LV5W3EqrPSgxasPj8g63TFptmmmvnedmO2q31UaHwgJmUibd4rMULd+grLUTbv6U
ZWk4S58TqN3BQH+kVwRg0aPZv1TMzmAc5SEeilk52eua+zeACgLXih8UQin4fYoI
Nvy648kIe4gZhZ5OXZUgh32PkwKBgQDK3JMLaZ4lRzy/aAPBTZCWafw8vQLWozCE
Em6AvsATtf6xxw1pgk/xvIXirAK+M7KSVK/v72uV4w+hUb8NTSzJvKmG3TlL+T7H
0CrGzA8iPIbDvnkM/hsXYRkJ6YK9OPvnQz5wOkSaO0ZZFFlhtiPBjfByVWr1FiOs
oZ6eWsyqaQKBgFipYfBkiwrNqpjb5dL1hC9jSxHemZy3SEyO3FllEzc0Q+Pty4mi
YEF0DoNwo0uSZXjkeRRirl0SKkaTZBY6j0hQ7bes1sK4lKz/Z7ikMQ4DRdtXnuqO
ePIDmmBRIw1iofoFVDeTBc7WrepbQ7RIweU29k0Zo+0mFHGruellnFDVAoGAOz+i
/tFRLCgbOPgjKKED2rqHviGiI5g0Ak7z0UxlAxzDj57IbwltWfgqzmJYxr6IqC5t
2FEABh30IbSjbToeG6mrhcU1B9h7GpbU94z/2or8/UyzRDUvKmvkiT2XPrbW89ty
8ApEoRsw17GWzXAKD2zqTipee8iEkNX/Yta4MgkCgYEAiy7H/7sI84xtDUmNVKbZ
sP4Cwn+SAqsoIWUaqkXwAkyuuZh//Qy+80c0VUVdehAWIOhg+J4Dx3w5Ut5GZklO
zJcqXu4gi/nzqDynM7FGKB1QaSIsA7v9GM/2QDfXQRB+bs2vxbW0o/c7IYLlgO8K
+HrXUBLfOULngzotvsNxfpI=
-----END PRIVATE KEY-----`,
});

const options = {};
const vonage = new Vonage(credentials, options);

/**
 * Book a new appointment with a doctor
 */
export async function bookAppointment(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Get the patient user
    const patient = await  db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "PATIENT",
      },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    // Parse form data
    const doctorId = formData.get("doctorId");
    const startTime = new Date(formData.get("startTime"));
    const endTime = new Date(formData.get("endTime"));
    const patientDescription = formData.get("description") || null;

    // Validate input
    if (!doctorId || !startTime || !endTime) {
      throw new Error("Doctor, start time, and end time are required");
    }

    // Check if the doctor exists and is verified
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }

    // Check if the patient has enough credits (2 credits per appointment)
    if(patient.credits < 2) {
        return {
          success: false,
          message: 'Insufficient credits to book an appointment. Please add credits.',
        };
    }

    // Check if the requested time slot is available
    const overlappingAppointment = await db.appointment.findFirst({
      where: {
        doctorId: doctorId,
        status: "SCHEDULED",
        OR: [
          {
            // New appointment starts during an existing appointment
            startTime: {
              lte: startTime,
            },
            endTime: {
              gt: startTime,
            },
          },
          {
            // New appointment ends during an existing appointment
            startTime: {
              lt: endTime,
            },
            endTime: {
              gte: endTime,
            },
          },
          {
            // New appointment completely overlaps an existing appointment
            startTime: {
              gte: startTime,
            },
            endTime: {
              lte: endTime,
            },
          },
        ],
      },
    });

    if (overlappingAppointment) {
      throw new Error("This time slot is already booked");
    }

    // Create a new Vonage Video API session
    const sessionId = await createVideoSession();

    // Deduct credits from patient and add to doctor
    const { success, error } = await deductCreditsForAppointment(
      patient.id,
      doctor.id
    );

    if (!success) {
      throw new Error(error || "Failed to deduct credits");
    }

    // Create the appointment with the video session ID
    const appointment = await db.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        startTime,
        endTime,
        patientDescription,
        status: "SCHEDULED",
        videoSessionId: sessionId, // Store the Vonage session ID
      },
    });

    revalidatePath("/appointments");
    return { success: true, appointment: appointment };
  } catch (error) {
    console.error("Failed to book appointment:", error);
    throw new Error("Failed to book appointment:" + error.message);
  }
}

/**
 * Generate a Vonage Video API session
 */
async function createVideoSession() {
  try {
    const session = await vonage.video.createSession({ mediaMode: "routed" });
    return session.sessionId;
  } catch (error) {
    throw new Error("Failed to create video session: " + error.message);
  }
}

/**
 * Generate a token for a video session
 * This will be called when either doctor or patient is about to join the call
 */
export async function generateVideoToken(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const appointmentId = formData.get("appointmentId");

    if (!appointmentId) {
      throw new Error("Appointment ID is required");
    }

    // Find the appointment and verify the user is part of it
    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Verify the user is either the doctor or the patient for this appointment
    if (appointment.doctorId !== user.id && appointment.patientId !== user.id) {
      throw new Error("You are not authorized to join this call");
    }

    // Verify the appointment is scheduled
    if (appointment.status !== "SCHEDULED") {
      throw new Error("This appointment is not currently scheduled");
    }

    // Verify the appointment is within a valid time range (e.g., starting 5 minutes before scheduled time)
    const now = new Date();
    const appointmentTime = new Date(appointment.startTime);
    const timeDifference = (appointmentTime - now) / (1000 * 60); // difference in minutes

    if (timeDifference > 30) {
      throw new Error(
        "The call will be available 30 minutes before the scheduled time"
      );
    }

    // Generate a token for the video session
    // Token expires 2 hours after the appointment start time
    const appointmentEndTime = new Date(appointment.endTime);
    const expirationTime =
      Math.floor(appointmentEndTime.getTime() / 1000) + 60 * 60; // 1 hour after end time

    // Use user's name and role as connection data
    const connectionData = JSON.stringify({
      name: user.name,
      role: user.role,
      userId: user.id,
    });

    // Generate the token with appropriate role and expiration
    const token = vonage.video.generateClientToken(appointment.videoSessionId, {
      role: "publisher", // Both doctor and patient can publish streams
      expireTime: expirationTime,
      data: connectionData,
    });

    // Update the appointment with the token
    await db.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        videoSessionToken: token,
      },
    });

    return {
      success: true,
      videoSessionId: appointment.videoSessionId,
      token: token,
    };
  } catch (error) {
    console.error("Failed to generate video token:", error);
    throw new Error("Failed to generate video token:" + error.message);
  }
}

/**
 * Get doctor by ID
 */
export async function getDoctorById(doctorId) {
  try {
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return { doctor };
  } catch (error) {
    console.error("Failed to fetch doctor:", error);
    throw new Error("Failed to fetch doctor details");
  }
}

/**
 * Get available time slots for booking for the next 4 days
 */
export async function getAvailableTimeSlots(doctorId) {
  try {
    // Validate doctor existence and verification
    const doctor = await db.user.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found or not verified");
    }

    // Fetch a single availability record
    const availability = await db.availability.findFirst({
      where: {
        doctorId: doctor.id,
        status: "AVAILABLE",
      },
    });

    if (!availability) {
      throw new Error("No availability set by doctor");
    }

    // Get the next 4 days
    const now = new Date();
    const days = [now, addDays(now, 1), addDays(now, 2), addDays(now, 3)];

    // Fetch existing appointments for the doctor over the next 4 days
    const lastDay = endOfDay(days[3]);
    const existingAppointments = await db.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: "SCHEDULED",
        startTime: {
          lte: lastDay,
        },
      },
    });

    const availableSlotsByDay = {};

    // For each of the next 4 days, generate available slots
    for (const day of days) {
      const dayString = format(day, "yyyy-MM-dd");
      availableSlotsByDay[dayString] = [];

      // Create a copy of the availability start/end times for this day
      const availabilityStart = new Date(availability.startTime);
      const availabilityEnd = new Date(availability.endTime);

      // Set the day to the current day we're processing
      availabilityStart.setFullYear(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      );
      availabilityEnd.setFullYear(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      );

      let current = new Date(availabilityStart);
      const end = new Date(availabilityEnd);

      while (
        isBefore(addMinutes(current, 30), end) ||
        +addMinutes(current, 30) === +end
      ) {
        const next = addMinutes(current, 30);

        // Skip past slots
        if (isBefore(current, now)) {
          current = next;
          continue;
        }

        const overlaps = existingAppointments.some((appointment) => {
          const aStart = new Date(appointment.startTime);
          const aEnd = new Date(appointment.endTime);

          return (
            (current >= aStart && current < aEnd) ||
            (next > aStart && next <= aEnd) ||
            (current <= aStart && next >= aEnd)
          );
        });

        if (!overlaps) {
          availableSlotsByDay[dayString].push({
            startTime: current.toISOString(),
            endTime: next.toISOString(),
            formatted: `${format(current, "h:mm a")} - ${format(
              next,
              "h:mm a"
            )}`,
            day: format(current, "EEEE, MMMM d"),
          });
        }

        current = next;
      }
    }

    // Convert to array of slots grouped by day for easier consumption by the UI
    const result = Object.entries(availableSlotsByDay).map(([date, slots]) => ({
      date,
      displayDate:
        slots.length > 0
          ? slots[0].day
          : format(new Date(date), "EEEE, MMMM d"),
      slots,
    }));

    return { days: result };
  } catch (error) {
    console.error("Failed to fetch available slots:", error);
    throw new Error("Failed to fetch available time slots: " + error.message);
  }
}