import { ClipboardCheck, AlertCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";

export default async function VerificationPage() {
  const user = await getCurrentUser();
  if (user?.verificationStatus === "VERIFIED") {
    redirect("/doctor");
  }

  const isRejected = user?.verificationStatus === "REJECTED";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-emerald-50 border border-emerald-100 shadow-sm rounded-2xl">
          <CardHeader className="text-center">
            <div
              className={`mx-auto p-4 ${
                isRejected ? "bg-red-50" : "bg-yellow-50"
              } rounded-full mb-4 w-fit`}
            >
              {isRejected ? (
                <XCircle className="h-8 w-8 text-red-500" />
              ) : (
                <ClipboardCheck className="h-8 w-8 text-yellow-500" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-black">
              {isRejected
                ? "Verification Declined"
                : "Verification in Progress"}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {isRejected
                ? "Unfortunately, your application needs revision"
                : "Thank you for submitting your information"}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            {isRejected ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start text-left">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p className="mb-2">
                    Our administrative team reviewed your application and found
                    it doesn't meet our current requirements. Common reasons:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Insufficient or unclear credential documentation</li>
                    <li>Professional experience requirements not met</li>
                    <li>Incomplete or vague service description</li>
                  </ul>
                  <p>
                    Please update your application and resubmit it for review.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start text-left">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground text-sm">
                  Your profile is currently under review by our admin team.
                  This usually takes 1–2 business days. You'll receive an email
                  once verification is complete.
                </p>
              </div>
            )}

            <p className="text-muted-foreground mb-6">
              {isRejected
                ? "You can update your doctor profile and resubmit for verification."
                : "While you wait, you can explore the platform or reach out to support for questions."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-emerald-200 text-black"
              >
                <Link href="/">Return to Home</Link>
              </Button>

              {isRejected ? (
                <Button
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Link href="/doctor/update-profile">Update Profile</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Link href="/contact-support">Contact Support</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
