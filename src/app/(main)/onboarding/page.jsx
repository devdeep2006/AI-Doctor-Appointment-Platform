"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Stethoscope, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setUserRole } from "@/actions/onboarding";
import { doctorFormSchema } from "@/lib/schema";
import { SPECIALTIES } from "@/lib/specialities";
import useFetch from "@/hooks/use-fetch";

export default function OnboardingPage() {
  const [step, setStep] = useState("choose-role");
  const router = useRouter();
  const { loading, data, fn: submitUserRole } = useFetch(setUserRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialtyValue = watch("specialty");

  const handlePatientSelection = async () => {
    if (loading) return;
    const formData = new FormData();
    formData.append("role", "PATIENT");
    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      router.push(data.redirect);
    }
  }, [data]);

  const onDoctorSubmit = async (data) => {
    if (loading) return;
    const formData = new FormData();
    formData.append("role", "DOCTOR");
    formData.append("specialty", data.specialty);
    formData.append("experience", data.experience.toString());
    formData.append("credentialUrl", data.credentialUrl);
    formData.append("description", data.description);
    await submitUserRole(formData);
  };

  // Step 1: Choose Role
  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl transition-all hover:shadow-purple-200">
          <CardContent
            className="pt-6 pb-6 flex flex-col items-center text-center cursor-pointer"
            onClick={() => !loading && handlePatientSelection()}
          >
            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4">
              <User className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-slate-800 mb-2">
              Join as a Patient
            </CardTitle>
            <CardDescription className="mb-4 text-slate-600">
              Book appointments, consult with doctors, and manage your health journey
            </CardDescription>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue as Patient"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl transition-all hover:shadow-purple-200">
          <CardContent
            className="pt-6 pb-6 flex flex-col items-center text-center cursor-pointer"
            onClick={() => !loading && setStep("doctor-form")}
          >
            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-slate-800 mb-2">
              Join as a Doctor
            </CardTitle>
            <CardDescription className="mb-4 text-slate-600">
              Create your profile, set availability & provide consultations
            </CardDescription>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
              disabled={loading}
            >
              Continue as Doctor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 2: Doctor Form
  if (step === "doctor-form") {
    return (
      <Card className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
        <CardContent className="pt-6">
          <div className="mb-6">
            <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
              Complete Your Doctor Profile
            </CardTitle>
            <CardDescription className="text-slate-600">
              Provide your professional details for verification
            </CardDescription>
          </div>

          <form onSubmit={handleSubmit(onDoctorSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="specialty">Medical Specialty</Label>
              <Select
                value={specialtyValue}
                onValueChange={(value) => setValue("specialty", value)}
              >
                <SelectTrigger className="bg-gray-100 focus:ring-2 ring-purple-400">
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((spec) => (
                    <SelectItem
                      key={spec.name}
                      value={spec.name}
                      className="flex items-center gap-2"
                    >
                      <span className="text-purple-500">{spec.icon}</span>
                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.specialty && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.specialty.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                className="bg-gray-100 focus:ring-2 ring-purple-400"
                id="experience"
                type="number"
                placeholder="e.g. 5"
                {...register("experience", { valueAsNumber: true })}
              />
              {errors.experience && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Credential Document Link</Label>
              <Input
                className="bg-gray-100 focus:ring-2 ring-purple-400"
                id="credentialUrl"
                type="url"
                placeholder="https://example.com/degree.pdf"
                {...register("credentialUrl")}
              />
              {errors.credentialUrl && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.credentialUrl.message}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Link to your medical degree or certificate
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className="bg-gray-100 focus:ring-2 ring-purple-400"
                id="description"
                placeholder="Describe your services and approach to care..."
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border border-purple-300 text-purple-700"
                onClick={() => setStep("choose-role")}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit for Verification"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}
