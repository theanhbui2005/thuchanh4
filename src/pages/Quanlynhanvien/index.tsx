import { Button, Table, Modal, Tabs } from 'antd';
import { useModel } from 'umi';
import EmployeeForm from './Form';
import ServiceForm from './ServiceForm';

const { TabPane } = Tabs;

const EmployeePage = () => {
  const { 
    // Employee states
    employees, visible, setVisible, isEdit, setIsEdit, selectedEmployee, setSelectedEmployee, deleteEmployee,
    // Service states
    services, serviceVisible, setServiceVisible, isEditService, setIsEditService, selectedService, setSelectedService, deleteService 
  } = useModel('quanlynhanvien');

  const handleEdit = (record: Employee.Record) => {
    setSelectedEmployee(record);
    setIsEdit(true);
    setVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa nhân viên này?',
      onOk: () => deleteEmployee(id),
    });
  };

  const handleEditService = (record: Service.Record) => {
    setSelectedService(record);
    setIsEditService(true);
    setServiceVisible(true);
  };

  const handleDeleteService = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa dịch vụ này?',
      onOk: () => deleteService(id),
    });
  };

  const employeeColumns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Tuổi', dataIndex: 'age', key: 'age' },
    { 
      title: 'Lịch làm việc', 
      key: 'schedule',
      render: (_: any, record: Employee.Record) => (
        `${record.workingHours} (${record.workingDays})`
      )
    },
    { title: 'Số khách/ngày', dataIndex: 'maxAppointmentsPerDay', key: 'maxAppointmentsPerDay' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Employee.Record) => (
        <>
          <Button onClick={() => handleEdit(record)} type='link'>Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} type='link' danger>Xóa</Button>
        </>
      ),
    },
  ];

  const serviceColumns = [
    { title: 'Tên dịch vụ', dataIndex: 'name', key: 'name' },
    { 
      title: 'Giá (VNĐ)', 
      dataIndex: 'price', 
      key: 'price',
      render: (price: number) => price.toLocaleString('vi-VN')
    },
    { 
      title: 'Thời gian (phút)', 
      dataIndex: 'duration', 
      key: 'duration',
      render: (duration: number) => `${duration} phút`
    },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Service.Record) => (
        <>
          <Button onClick={() => handleEditService(record)} type='link'>Sửa</Button>
          <Button onClick={() => handleDeleteService(record.id)} type='link' danger>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Quản lý nhân viên" key="1">
          <Button 
            type='primary' 
            onClick={() => { 
              setSelectedEmployee(null); 
              setIsEdit(false); 
              setVisible(true); 
            }}
            style={{ marginBottom: 16 }}
          >
            Thêm Nhân Viên
          </Button>
          <Table columns={employeeColumns} dataSource={employees} rowKey="id" />
        </TabPane>
        
        <TabPane tab="Quản lý dịch vụ" key="2">
          <Button 
            type='primary' 
            onClick={() => { 
              setSelectedService(null); 
              setIsEditService(false); 
              setServiceVisible(true); 
            }}
            style={{ marginBottom: 16 }}
          >
            Thêm Dịch Vụ
          </Button>
          <Table columns={serviceColumns} dataSource={services} rowKey="id" />
        </TabPane>
      </Tabs>

      <Modal 
        title={isEdit ? "Sửa nhân viên" : "Thêm nhân viên"}
        visible={visible} 
        footer={null} 
        onCancel={() => setVisible(false)}
      >
        <EmployeeForm />
      </Modal>

      <Modal 
        title={isEditService ? "Sửa dịch vụ" : "Thêm dịch vụ"}
        visible={serviceVisible} 
        footer={null} 
        onCancel={() => setServiceVisible(false)}
      >
        <ServiceForm />
      </Modal>
    </div>
  );
};

export default EmployeePage;
