"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, User, Medal, FileText, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { updateDoctorStatus } from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export function PendingDoctors({ doctors }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const {
    loading,
    data,
    fn: submitStatusUpdate,
  } = useFetch(updateDoctorStatus);

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseDialog = () => {
    setSelectedDoctor(null);
  };

  const handleUpdateStatus = async (doctorId, status) => {
    if (loading) return;

    const formData = new FormData();
    formData.append("doctorId", doctorId);
    formData.append("status", status);

    await submitStatusUpdate(formData);
  };

  useEffect(() => {
    if (data?.success) {
      handleCloseDialog();
    }
  }, [data]);

  return (
    <div>
      <Card className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-50 border border-pink-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-pink-700">
            Pending Doctor Verifications
          </CardTitle>
          <CardDescription className="text-slate-600">
            Review and approve doctor applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {doctors.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No pending verification requests at this time.
            </div>
          ) : (
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="bg-white border border-pink-200 hover:shadow-lg transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-pink-100 rounded-full p-2">
                          <User className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {doctor.specialty} • {doctor.experience} years experience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 border border-yellow-300 text-yellow-600"
                        >
                          Pending
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(doctor)}
                          className="border-pink-300 hover:bg-pink-100 text-pink-600"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Doctor Details Dialog */}
      {selectedDoctor && (
        <Dialog open={!!selectedDoctor} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-3xl bg-white border border-pink-200 shadow-xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-pink-700">
                Doctor Verification Details
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600">
                Review the doctor's information carefully before making a decision.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4 text-slate-700">
              {/* Basic Info */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-medium text-slate-500">Full Name</h4>
                  <p className="text-base font-semibold">{selectedDoctor.name}</p>
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-medium text-slate-500">Email</h4>
                  <p className="text-base font-semibold">{selectedDoctor.email}</p>
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-medium text-slate-500">
                    Application Date
                  </h4>
                  <p className="text-base font-semibold">
                    {format(new Date(selectedDoctor.createdAt), "PPP")}
                  </p>
                </div>
              </div>

              <Separator className="bg-pink-200" />

              {/* Professional Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-pink-700">
                    Professional Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-slate-500">Specialty</h4>
                    <p className="font-medium">{selectedDoctor.specialty}</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-slate-500">Years of Experience</h4>
                    <p className="font-medium">{selectedDoctor.experience} years</p>
                  </div>

                  <div className="space-y-1 col-span-2">
                    <h4 className="text-sm font-medium text-slate-500">Credentials</h4>
                    <a
                      href={selectedDoctor.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
                    >
                      View Credentials
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              <Separator className="bg-pink-200" />

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-pink-700">
                    Service Description
                  </h3>
                </div>
                <p className="text-slate-600 whitespace-pre-line">
                  {selectedDoctor.description}
                </p>
              </div>
            </div>

            {loading && <BarLoader width="100%" color="#D946EF" />}

            <DialogFooter className="flex sm:justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => handleUpdateStatus(selectedDoctor.id, "REJECTED")}
                disabled={loading}
                className="border border-red-300 text-red-500 hover:bg-red-100"
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={() => handleUpdateStatus(selectedDoctor.id, "VERIFIED")}
                disabled={loading}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
