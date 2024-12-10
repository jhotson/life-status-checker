import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TimeRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimeRangeSelector = ({ value, onChange }: TimeRangeSelectorProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">1 Week</SelectItem>
          <SelectItem value="month">1 Month</SelectItem>
          <SelectItem value="3months">3 Months</SelectItem>
          <SelectItem value="6months">6 Months</SelectItem>
          <SelectItem value="year">1 Year</SelectItem>
          <SelectItem value="2years">2 Years</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};