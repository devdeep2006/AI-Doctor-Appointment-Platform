
import { getPatientAppointments } from "@/actions/patient";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";
import PatientAppointmentsClient from "./PatientAppointmentsClient";

export default async function PatientAppointmentsPage() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  const { appointments, error } = await getPatientAppointments();

  return (
    <PatientAppointmentsClient 
      appointments={appointments || []}
      error={error}
    />
  );
}