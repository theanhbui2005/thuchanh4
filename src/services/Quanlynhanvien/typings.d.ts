declare module Employee {
	export interface Record {
	  id: number;
	  name: string;
	  age: number;
	  workingHours: string;
	  workingDays: string;
	  maxAppointmentsPerDay: number;
	}
  }
  declare module Service {
	export interface Record {
	  id: number;
	  name: string;
	  price: number;
	  duration: number;
	  description?: string;
	}
  }
  declare module Schedule {
	export interface Record {
	  id: number;
	  employeeId: number;
	  serviceId: number;
	  customerName: string;
	  date: string;  // "YYYY-MM-DD"
	  time: string;  // "HH:mm"
	  status: 'Pending' | 'Confirmed' | 'Cancelled';
	}
  }
	  