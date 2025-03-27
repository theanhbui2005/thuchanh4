// mock/appointments.ts
import { Appointment } from "@/types/appointments";

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

export default {
  "GET /api/appointments": (req: Request, res: Response) => {
    res.json(appointments);
  },
  "POST /api/appointments": (req: Request, res: Response) => {
    const newAppointment: Appointment = { ...req.body, id: String(appointments.length + 1) };
    appointments.push(newAppointment);
    res.json(newAppointment);
  },
  "PUT /api/appointments/:id": (req: Request, res: Response) => {
    const { id } = req.params;
    appointments = appointments.map((apt: Appointment) =>
      apt.id === id ? { ...apt, ...req.body } : apt
    );
    res.json({ success: true });
  },
};

interface Request {
  body: any;
  params: { id?: string };
}

interface Response {
  json: (data: any) => void;
}