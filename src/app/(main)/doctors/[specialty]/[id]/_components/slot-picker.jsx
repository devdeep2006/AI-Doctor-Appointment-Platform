"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SlotPicker({ days, onSelectSlot }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const firstDayWithSlots =
    days.find((day) => day.slots.length > 0)?.date || days[0]?.date;
  const [activeTab, setActiveTab] = useState(firstDayWithSlots);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmSelection = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start overflow-x-auto border-b border-white/10 mb-2 backdrop-blur-md bg-white/5 rounded-lg px-2">
          {days.map((day) => (
            <TabsTrigger
              key={day.date}
              value={day.date}
              disabled={day.slots.length === 0}
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                day.slots.length === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-purple-500/10 text-black"
              } ${
                activeTab === day.date
                  ? "bg-purple-500/20 text-black font-medium"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="opacity-90">
                  {format(new Date(day.date), "MMM d")}
                </span>
                <span className="opacity-60 text-xs">
                  ({format(new Date(day.date), "EEE")})
                </span>
                {day.slots.length > 0 && (
                  <span className="ml-2 bg-purple-500/20 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                    {day.slots.length}
                  </span>
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day.date} value={day.date} className="pt-4">
            {day.slots.length === 0 ? (
              <div className="text-center py-8 text-black/50">
                No available slots for this day.
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {day.displayDate}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {day.slots.map((slot) => (
                    <Card
                      key={slot.startTime}
                      className={`cursor-pointer backdrop-blur-sm border transition-all rounded-xl ${
                        selectedSlot?.startTime === slot.startTime
                          ? "bg-purple-600/20 border-purple-400"
                          : "bg-white/5 hover:border-purple-300 border-white/10"
                      }`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <CardContent className="p-3 flex items-center">
                        <Clock
                          className={`h-4 w-4 mr-2 ${
                            selectedSlot?.startTime === slot.startTime
                              ? "text-purple-600"
                              : "text-black/50"
                          }`}
                        />
                        <span
                          className={
                            selectedSlot?.startTime === slot.startTime
                              ? "text-black font-medium"
                              : "text-black/60"
                          }
                        >
                          {format(new Date(slot.startTime), "h:mm a")}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={confirmSelection}
          disabled={!selectedSlot}
          className={`bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold transition-all ${
            !selectedSlot ? "opacity-50 cursor-not-allowed" : "hover:from-purple-600 hover:to-purple-800"
          }`}
        >
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
