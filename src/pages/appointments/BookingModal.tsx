import React, { useState } from 'react';
import { CalendarEvent } from './eventUtils';
import { Button } from '@/components/ui/button';

interface BookingModalProps {
  event: CalendarEvent;
  onClose: () => void;
  onBook: (event: CalendarEvent, patientName: string) => void;
  onCancel: (event: CalendarEvent) => void;
}

export function BookingModal({
  event,
  onClose,
  onBook,
  onCancel,
}: BookingModalProps) {
  const [patientName, setPatientName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook(event, patientName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Đặt lịch hẹn</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Tiêu đề: {event.title}</p>
          <p className="text-sm text-gray-600">
            Thời gian:{' '}
            {event.start.toLocaleDateString()} {event.start.toLocaleTimeString()}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tên bệnh nhân
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onCancel(event)}
            >
              Hủy đặt lịch
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit">Xác nhận</Button>
          </div>
        </form>
      </div>
    </div>
  );
} 