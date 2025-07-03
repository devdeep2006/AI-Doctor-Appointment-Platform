"use client";

import { AppointmentCard } from "@/components/appointment-card";
import { PageHeader } from "@/components/page-header";
import { Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState, useEffect } from "react";

export default function PatientAppointmentsClient({ appointments, error }) {
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  useEffect(() => {
    if (selectedFilter === "ALL") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(
        (appointment) => appointment.status === selectedFilter
      );
      setFilteredAppointments(filtered);
    }
  }, [selectedFilter, appointments]);

  const getStatusCount = (status) => {
    if (status === "ALL") return appointments.length;
    return appointments.filter(apt => apt.status === status).length;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "text-blue-600";
      case "COMPLETED":
        return "text-green-600";
      case "CANCELLED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        icon={<Calendar />}
        title="My Appointments"
        backLink="/doctors"
        backLabel="Find Doctors"
      />

      <Card className="border-emerald-900/20 bg-amber-50">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl font-bold text-black flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-black-400" />
              Your Scheduled Appointments
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48 bg-white border-gray-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">
                    All Appointments ({getStatusCount("ALL")})
                  </SelectItem>
                  <SelectItem value="SCHEDULED">
                    <span className={getStatusColor("SCHEDULED")}>
                      Scheduled ({getStatusCount("SCHEDULED")})
                    </span>
                  </SelectItem>
                  <SelectItem value="COMPLETED">
                    <span className={getStatusColor("COMPLETED")}>
                      Completed ({getStatusCount("COMPLETED")})
                    </span>
                  </SelectItem>
                  <SelectItem value="CANCELLED">
                    <span className={getStatusColor("CANCELLED")}>
                      Cancelled ({getStatusCount("CANCELLED")})
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-400">Error: {error}</p>
            </div>
          ) : filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>
                  Showing {filteredAppointments.length} of {appointments.length} appointments
                </span>
                {selectedFilter !== "ALL" && (
                  <span className={`font-medium ${getStatusColor(selectedFilter)}`}>
                    {selectedFilter.toLowerCase().replace(/^\w/, c => c.toUpperCase())} appointments
                  </span>
                )}
              </div>
              
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="PATIENT"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {selectedFilter === "ALL" 
                  ? "No appointments scheduled" 
                  : `No ${selectedFilter.toLowerCase()} appointments`
                }
              </h3>
              <p className="text-muted-foreground">
                {selectedFilter === "ALL" 
                  ? "You do not have any appointments scheduled yet. Browse our doctors and book your first consultation."
                  : `You don't have any ${selectedFilter.toLowerCase()} appointments. Try selecting a different filter.`
                }
              </p>
              {selectedFilter !== "ALL" && (
                <button
                  onClick={() => setSelectedFilter("ALL")}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View all appointments
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}