import React from 'react';
import { CalendarEvent } from './eventUtils';

interface CalendarProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function Calendar({ events, onEventClick }: CalendarProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {Array.from({ length: 35 }).map((_, index) => {
          const dayEvents = events.filter(
            (event) => event.start.getDate() === index + 1
          );
          return (
            <div
              key={index}
              className="min-h-[100px] border p-2 cursor-pointer hover:bg-gray-50"
              onClick={() => {
                const event = dayEvents[0];
                if (event) onEventClick(event);
              }}
            >
              <div className="text-sm font-medium">{index + 1}</div>
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`text-xs p-1 mt-1 rounded ${
                    event.isBooked ? 'bg-green-100' : 'bg-blue-100'
                  }`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
} 