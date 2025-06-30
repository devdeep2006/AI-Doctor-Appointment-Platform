// app/dashboard/_components/doctor-earnings.jsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TrendingUp,
  Calendar,
  BarChart3,
  CreditCard,
  Loader2,
  AlertCircle,
  Coins,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { requestPayout } from "@/actions/payout";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function DoctorEarnings({ earnings, payouts = [] }) {
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");

  const {
    thisMonthEarnings = 0,
    completedAppointments = 0,
    averageEarningsPerMonth = 0,
    availableCredits = 0,
    availablePayout = 0,
  } = earnings;

  const { loading, data, fn: submitPayoutRequest } = useFetch(requestPayout);

  const pendingPayout = payouts.find((p) => p.status === "PROCESSING");

  const handlePayoutRequest = async (e) => {
    e.preventDefault();
    if (!paypalEmail) {
      toast.error("PayPal email is required");
      return;
    }
    const formData = new FormData();
    formData.append("paypalEmail", paypalEmail);
    await submitPayoutRequest(formData);
  };

  useEffect(() => {
    if (data?.success) {
      toast.success("Payout request submitted!");
      setPaypalEmail("");
      setShowPayoutDialog(false);
    }
  }, [data]);

  const platformFee = availableCredits * 2;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{
          title: "Available Credits",
          value: availableCredits,
          subtitle: `$${availablePayout.toFixed(2)} available for payout`,
          icon: <Coins className="h-6 w-6 text-purple-500" />,
        }, {
          title: "This Month",
          value: `$${thisMonthEarnings.toFixed(2)}`,
          icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
        }, {
          title: "Total Appointments",
          value: completedAppointments,
          subtitle: "completed",
          icon: <Calendar className="h-6 w-6 text-purple-500" />,
        }, {
          title: "Avg/Month",
          value: `$${averageEarningsPerMonth.toFixed(2)}`,
          icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
        }].map((card, idx) => (
          <Card key={idx} className="border-emerald-900/20  backdrop-blur-md bg-white-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black/60">{card.title}</p>
                  <p className="text-3xl font-bold text-black">{card.value}</p>
                  {card.subtitle && (
                    <p className="text-xs text-black/50">{card.subtitle}</p>
                  )}
                </div>
                <div className="bg-purple-100 p-3 rounded-full">{card.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payout Management */}
      <Card className="border-emerald-900/20 bg-white/40 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
            Payout Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border border-emerald-900/20 bg-white/40">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-black">
                Available for Payout
              </h3>
              <Badge
                variant="outline"
                className={
                  pendingPayout
                    ? "bg-yellow-100 border-yellow-300 text-yellow-600"
                    : "bg-green-100 border-green-300 text-green-600"
                }
              >
                {pendingPayout ? "PROCESSING" : "Available"}
              </Badge>
            </div>

            {pendingPayout ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-black/60">Pending Credits</p>
                    <p className="text-black font-medium">{pendingPayout.credits}</p>
                  </div>
                  <div>
                    <p className="text-black/60">Pending Amount</p>
                    <p className="text-black font-medium">
                      ${pendingPayout.netAmount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-black/60">PayPal Email</p>
                    <p className="text-black font-medium text-xs">
                      {pendingPayout.paypalEmail}
                    </p>
                  </div>
                </div>
                <Alert className="mt-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm text-black/80">
                    Your payout request is under processing. Once approved,
                    credits will be deducted and payment sent via PayPal.
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-black/60">Available Credits</p>
                    <p className="text-black font-medium">{availableCredits}</p>
                  </div>
                  <div>
                    <p className="text-black/60">Payout Amount</p>
                    <p className="text-black font-medium">${availablePayout.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-black/60">Platform Fee</p>
                    <p className="text-black font-medium">${platformFee.toFixed(2)}</p>
                  </div>
                </div>
                {availableCredits > 0 && (
                  <Button
                    onClick={() => setShowPayoutDialog(true)}
                    className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Request Payout for All Credits
                  </Button>
                )}
              </>
            )}
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm text-black">
              <strong>Payout Structure:</strong> Earn $8/credit. Platform takes $2/credit.
              Payout via PayPal.
            </AlertDescription>
          </Alert>

          {/* History */}
          {payouts.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-black">Payout History</h3>
              <div className="space-y-2">
                {payouts.slice(0, 5).map((payout) => (
                  <div
                    key={payout.id}
                    className="flex items-center justify-between p-3 rounded-md bg-white/30 border border-emerald-900/10"
                  >
                    <div>
                      <p className="text-black font-medium">
                        {format(new Date(payout.createdAt), "MMM d, yyyy")}
                      </p>
                      <p className="text-sm text-black/70">
                        {payout.credits} credits • ${payout.netAmount.toFixed(2)}
                      </p>
                      <p className="text-xs text-black/50">{payout.paypalEmail}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        payout.status === "PROCESSED"
                          ? "bg-green-100 border-green-300 text-green-600"
                          : "bg-yellow-100 border-yellow-300 text-yellow-600"
                      }
                    >
                      {payout.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payout Dialog */}
      <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">
              Request Payout
            </DialogTitle>
            <DialogDescription>
              Fill in your PayPal to receive funds.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePayoutRequest} className="space-y-4">
            <div className="bg-white/40 p-4 rounded-lg space-y-2 border border-emerald-900/20">
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Available credits:</span>
                <span className="text-black">{availableCredits}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Gross amount:</span>
                <span className="text-black">${(availableCredits * 10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black/60">Platform fee:</span>
                <span className="text-black">-${platformFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-emerald-900/20 pt-2 flex justify-between font-medium">
                <span className="text-black">Net payout:</span>
                <span className="text-purple-600">${availablePayout.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paypalEmail" className="text-black">PayPal Email</Label>
              <Input
                id="paypalEmail"
                type="email"
                placeholder="your-paypal@example.com"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="bg-white/70 border border-emerald-900/20 text-black placeholder:text-black/50"
                required
              />
              <p className="text-sm text-black/60">
                Make sure this email is correct to receive funds.
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm text-black">
                {availableCredits} credits will be deducted after admin approval.
                ${availablePayout.toFixed(2)} will be sent to your PayPal.
              </AlertDescription>
            </Alert>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPayoutDialog(false)}
                className="border-emerald-900/30 text-black"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Requesting...
                  </>
                ) : (
                  "Request Payout"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
