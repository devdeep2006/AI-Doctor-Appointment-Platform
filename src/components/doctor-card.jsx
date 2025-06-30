import { User, Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DoctorCard({ doctor }) {
  return (
    <Card className="bg-gradient-to-br from-white via-pink-50 to-purple-50 border border-pink-100/40 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-16 h-16 object-cover"
              />
            ) : (
              <User className="h-7 w-7 text-pink-600" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-semibold text-slate-800 text-xl">{doctor.name}</h3>
              <Badge
                variant="outline"
                className="bg-white/60 backdrop-blur-sm border border-pink-200 text-pink-600 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                <Star className="h-4 w-4 mr-1" />
                Verified
              </Badge>
            </div>

            <p className="text-sm text-slate-600 mb-1">
              {doctor.specialty} • {doctor.experience} years experience
            </p>

            <div className="mt-2 line-clamp-2 text-sm text-slate-600">
              {doctor.description}
            </div>

            <Button
              asChild
              className="w-full mt-4 text-white text-base font-semibold py-2 px-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-[1.02] transition-transform"
            >
              <Link href={`/doctors/${doctor.specialty}/${doctor.id}`}>
                <Calendar className="h-4 w-4 mr-2" />
                View Profile & Book
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
