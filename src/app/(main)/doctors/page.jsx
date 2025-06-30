"use client"
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SPECIALTIES } from "@/lib/specialities";

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecialties = SPECIALTIES.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500 mb-4">
          Find Your Perfect Doctor
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Find care by specialty or explore our full range of certified Doctor's
        </p>

        {/* Search Field */}
        <div className="w-full max-w-md mt-6">
          <input
            type="text"
            placeholder="Search specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-purple-300 bg-white/70 backdrop-blur-md text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Specialty Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSpecialties.map((specialty) => (
          <Link key={specialty.name} href={`/doctors/${specialty.name}`}>
            <Card className="group bg-white/10 backdrop-blur-sm border border-emerald-900/20 hover:border-purple-500 transition-all cursor-pointer rounded-2xl shadow-md h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-900/20 group-hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center">
                  <div className="text-pink-400 group-hover:text-white text-xl transition-colors duration-200">
                    {specialty.icon}
                  </div>
                </div>
                <h3 className="font-medium text-black group-hover:text-purple-600 text-lg transition-colors duration-200">
                  {specialty.name}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredSpecialties.length === 0 && (
        <div className="text-center mt-16 text-gray-600">
          <p className="text-xl">🔍 No specialties found</p>
          <p>Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
