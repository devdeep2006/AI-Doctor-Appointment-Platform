import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/pricing";

export default async function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <div className="flex justify-start mb-4">
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Badge
          variant="outline"
          className="bg-purple-900 border border-emerald-700/30 text-white text-sm font-medium px-4 py-1 mb-4"
        >
          Affordable Healthcare
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2] mb-4">
          Simple, Transparent Pricing
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect consultation package that fits your healthcare
          needs — no hidden fees or long-term commitments.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="max-w-5xl mx-auto bg-pink-200 border-emerald-900">
        <Pricing />
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-2">
          Questions? We're Here to Help
        </h2>
        <p className="text-muted-foreground mb-2">
          Reach out at{" "}
          <a
            href="mailto:support@novacare.com"
            className="underline hover:text-purple-400 transition"
          >
            support@medimeet.com
          </a>
        </p>
      </div>
    </div>
  );
}
