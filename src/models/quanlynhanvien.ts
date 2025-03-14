import { useState } from 'react';

const useEmployeeModel = () => {
  // Employee states
  const [employees, setEmployees] = useState<Employee.Record[]>(() => {
    return JSON.parse(localStorage.getItem('employees') || '[]');
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee.Record | null>(null);

  // Service states
  const [services, setServices] = useState<Service.Record[]>(() => {
    return JSON.parse(localStorage.getItem('services') || '[]');
  });
  const [serviceVisible, setServiceVisible] = useState<boolean>(false);
  const [isEditService, setIsEditService] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service.Record | null>(null);

  // Employee functions
  const addEmployee = (employee: Omit<Employee.Record, 'id'>) => {
    const maxId = employees.reduce((max, emp) => Math.max(max, emp.id), 0);
    const newEmployee = { ...employee, id: maxId + 1 };
    const newEmployees = [...employees, newEmployee];
    localStorage.setItem('employees', JSON.stringify(newEmployees));
    setEmployees(newEmployees);
  };

  const updateEmployee = (updatedEmployee: Employee.Record) => {
    const newEmployees = employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    localStorage.setItem('employees', JSON.stringify(newEmployees));
    setEmployees(newEmployees);
  };

  const deleteEmployee = (employeeId: number) => {
    const newEmployees = employees.filter(emp => emp.id !== employeeId);
    localStorage.setItem('employees', JSON.stringify(newEmployees));
    setEmployees(newEmployees);
  };

  // Service functions
  const addService = (service: Omit<Service.Record, 'id'>) => {
    const maxId = services.reduce((max, srv) => Math.max(max, srv.id), 0);
    const newService = { ...service, id: maxId + 1 };
    const newServices = [...services, newService];
    localStorage.setItem('services', JSON.stringify(newServices));
    setServices(newServices);
  };

  const updateService = (updatedService: Service.Record) => {
    const newServices = services.map(srv => 
      srv.id === updatedService.id ? updatedService : srv
    );
    localStorage.setItem('services', JSON.stringify(newServices));
    setServices(newServices);
  };

  const deleteService = (serviceId: number) => {
    const newServices = services.filter(srv => srv.id !== serviceId);
    localStorage.setItem('services', JSON.stringify(newServices));
    setServices(newServices);
  };

  return {
    // Employee states and functions
    employees,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedEmployee,
    setSelectedEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee,

    // Service states and functions
    services,
    serviceVisible,
    setServiceVisible,
    isEditService,
    setIsEditService,
    selectedService,
    setSelectedService,
    addService,
    updateService,
    deleteService,
  };
};

export default useEmployeeModel;
