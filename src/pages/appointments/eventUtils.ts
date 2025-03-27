export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isBooked: boolean;
  patient?: string;
} 