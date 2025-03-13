// services/api.ts
import request from "umi-request";

export const getAppointments = () => request.get("/api/appointments");
export const createAppointment = (data: any) => request.post("/api/appointments", { data });
export const updateAppointment = (id: string, data: any) =>
  request.put(`/api/appointments/${id}`, { data });