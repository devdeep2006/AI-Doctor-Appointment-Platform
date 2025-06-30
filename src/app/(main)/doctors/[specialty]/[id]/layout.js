import { getDoctorById } from "@/actions/appointments";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import ToastWrapper from "./_components/toast-wrapper";
export async function generateMetadata({ params }) {
  const { id } = await params;

  const { doctor } = await getDoctorById(id);
  return {
    title: `Dr. ${doctor.name} - MediMeet`,
    description: `Book an appointment with Dr. ${doctor.name}, ${doctor.specialty} specialist with ${doctor.experience} years of experience.`,
  };
}

export default async function DoctorProfileLayout({ children, params }) {
  const { id } = await params;
  const { doctor } = await getDoctorById(id);

  if (!doctor) redirect("/doctors");

  return (
    <div className="container mx-auto">
      <ToastWrapper> {/* ✅ CLIENT WRAPPER HERE */}
        <PageHeader
          title={"Dr. " + doctor.name}
          backLink={`/doctors/${doctor.specialty}`}
          backLabel={`Back to ${doctor.specialty}`}
        />
        {children}
      </ToastWrapper>
    </div>
  );
}