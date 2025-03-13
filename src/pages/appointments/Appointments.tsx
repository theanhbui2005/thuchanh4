interface Appointment {
    id: string;
    employeeId: string; 
    date: string; 
    time: string; 
    customerName: string; 
    status: "Pending" | "Confirmed" | "Completed" | "Cancelled"; 
  }