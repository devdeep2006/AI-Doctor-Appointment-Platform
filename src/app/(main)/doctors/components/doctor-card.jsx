import { User, Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DoctorCard({ doctor }) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400/40 transition-all shadow-md rounded-2xl">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-purple-300" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-semibold text-black text-lg">{doctor.name}</h3>
              <Badge
                variant="outline"
                className="bg-purple-500/10 border-purple-400/30 text-purple-600 px-2 py-1"
              >
                <Star className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>

            <p className="text-sm text-black mb-1">
              {doctor.specialty} • {doctor.experience} years experience
            </p>

            <div className="mt-2 line-clamp-2 text-sm text-black/60 mb-4">
              {doctor.description}
            </div>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-black font-medium"
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
