import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export default function DatePickerDropdown({ value, onChange }) {
  // Convert the string from Home into a Date object
  const selectedDate = value ? new Date(value) : undefined;

  const handleSelect = (date) => {
    if (!date) return;

    // Send YYYY-MM-DD to the parent component
    const formattedDate = format(date, "yyyy-MM-dd");
    onChange(formattedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[220px] justify-between text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          {selectedDate
            ? format(selectedDate, "dd-MM-yyyy")
            : "Pick a date"}

          <CalendarIcon className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}