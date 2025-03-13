import type { NextApiRequest, NextApiResponse } from 'next';
import { Appointment } from '@/types/appointments';

let appointments: Appointment[] = [
  {
    id: "1",
    employeeId: "emp1",
    date: "2025-03-15",
    time: "14:00",
    customerName: "Nguyen Van A",
    status: "Pending",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(appointments);
  } else if (req.method === 'POST') {
    const newAppointment: Appointment = { 
      ...req.body, 
      id: String(appointments.length + 1) 
    };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    appointments = appointments.map((apt: Appointment) =>
      apt.id === id ? { ...apt, ...req.body } : apt
    );
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 