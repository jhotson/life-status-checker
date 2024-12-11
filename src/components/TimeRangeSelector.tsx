import React from 'react';
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface TimeRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimeRangeSelector = ({ value, onChange }: TimeRangeSelectorProps) => {
  const timeRanges = [
    { label: '1 Month', value: 'month' },
    { label: '3 Months', value: '3months' },
    { label: '6 Months', value: '6months' },
    { label: '1 Year', value: 'year' },
    { label: '2 Years', value: '2years' },
  ];

  return (
    <div className="flex justify-start gap-4 mb-6 overflow-x-auto">
      {timeRanges.map((range) => (
        <Button
          key={range.value}
          variant="ghost"
          onClick={() => onChange(range.value)}
          className={cn(
            "whitespace-nowrap",
            value === range.value && "underline underline-offset-4"
          )}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
};