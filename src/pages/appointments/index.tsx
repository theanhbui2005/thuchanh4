import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Tag, Modal, Form, Input, DatePicker, TimePicker, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';

interface Appointment {
  id: string;
  date: string;
  time: string;
  customerName: string;
  employeeId: string;
  status: 'Chờ duyệt' | 'Xác nhận' | 'Hoàn thành' | 'Hủy';
}

interface Employee {
  id: string;
  name: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [employees] = useState<Employee[]>([
    { id: 'emp1', name: 'Nguyễn Văn A' },
    { id: 'emp2', name: 'Trần Thị B' },
    { id: 'emp3', name: 'Lê Văn C' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Mô phỏng lấy dữ liệu từ API
    const mockData: Appointment[] = [
      {
        id: '1',
        date: '2025-03-15',
        time: '09:00',
        customerName: 'Nguyễn Thị X',
        employeeId: 'emp1',
        status: 'Chờ duyệt',
      },
      {
        id: '2',
        date: '2025-03-16',
        time: '14:00',
        customerName: 'Trần Văn Y',
        employeeId: 'emp2',
        status: 'Xác nhận',
      },
      {
        id: '3',
        date: '2025-03-17',
        time: '10:30',
        customerName: 'Lê Thị Z',
        employeeId: 'emp3',
        status: 'Hoàn thành',
      },
    ];
    setAppointments(mockData);
  }, []);

  const showModal = (record?: Appointment) => {
    setIsModalVisible(true);
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue({
        customerName: record.customerName,
        date: moment(record.date),
        time: moment(record.time, 'HH:mm'),
        employeeId: record.employeeId,
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newAppointment: Appointment = {
        id: editingId || String(appointments.length + 1),
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        customerName: values.customerName,
        employeeId: values.employeeId,
        status: editingId ? (appointments.find(a => a.id === editingId)?.status || 'Chờ duyệt') : 'Chờ duyệt',
      };

      // Kiểm tra lịch trùng
      const isTimeConflict = appointments.some(
        (app) => 
          app.id !== newAppointment.id && 
          app.date === newAppointment.date && 
          app.time === newAppointment.time && 
          app.employeeId === newAppointment.employeeId
      );

      if (isTimeConflict) {
        message.error('Lịch đã bị trùng! Vui lòng chọn thời gian hoặc nhân viên khác.');
        return;
      }

      if (editingId) {
        setAppointments(appointments.map(app => app.id === editingId ? newAppointment : app));
        message.success('Cập nhật lịch hẹn thành công!');
      } else {
        setAppointments([...appointments, newAppointment]);
        message.success('Tạo lịch hẹn mới thành công!');
      }

      handleCancel();
    });
  };

  const updateStatus = (record: Appointment, newStatus: Appointment['status']) => {
    const updatedAppointments = appointments.map(app => 
      app.id === record.id ? { ...app, status: newStatus } : app
    );
    setAppointments(updatedAppointments);
    message.success(`Đã cập nhật trạng thái lịch hẹn thành ${newStatus}!`);
  };

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Giờ',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Nhân viên phục vụ',
      dataIndex: 'employeeId',
      key: 'employeeId',
      render: (employeeId: string) => employees.find(emp => emp.id === employeeId)?.name || employeeId,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        switch (status) {
          case 'Chờ duyệt':
            color = 'gold';
            break;
          case 'Xác nhận':
            color = 'blue';
            break;
          case 'Hoàn thành':
            color = 'green';
            break;
          case 'Hủy':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Appointment) => (
        <div className="flex space-x-2">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small" 
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          {record.status === 'Chờ duyệt' && (
            <Button 
              type="primary" 
              icon={<CheckOutlined />} 
              size="small" 
              onClick={() => updateStatus(record, 'Xác nhận')}
            >
              Xác nhận
            </Button>
          )}
          {record.status === 'Xác nhận' && (
            <Button 
              type="primary" 
              icon={<CheckOutlined />} 
              size="small" 
              onClick={() => updateStatus(record, 'Hoàn thành')}
            >
              Hoàn thành
            </Button>
          )}
          {(record.status === 'Chờ duyệt' || record.status === 'Xác nhận') && (
            <Button 
              danger 
              icon={<CloseOutlined />} 
              size="small" 
              onClick={() => updateStatus(record, 'Hủy')}
            >
              Hủy
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageContainer title="Quản lý lịch hẹn">
      <Card>
        <div className="mb-4">
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
          >
            Tạo lịch hẹn mới
          </Button>
        </div>
        <Table 
          dataSource={appointments} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingId ? "Chỉnh sửa lịch hẹn" : "Tạo lịch hẹn mới"}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={editingId ? "Cập nhật" : "Tạo mới"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            name="customerName" 
            label="Tên khách hàng" 
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>
          <Form.Item 
            name="date" 
            label="Ngày hẹn" 
            rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn!' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item 
            name="time" 
            label="Giờ hẹn" 
            rules={[{ required: true, message: 'Vui lòng chọn giờ hẹn!' }]}
          >
            <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={30} />
          </Form.Item>
          <Form.Item 
            name="employeeId" 
            label="Nhân viên phục vụ" 
            rules={[{ required: true, message: 'Vui lòng chọn nhân viên phục vụ!' }]}
          >
            <Select placeholder="Chọn nhân viên">
              {employees.map(emp => (
                <Select.Option key={emp.id} value={emp.id}>{emp.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default AppointmentsPage;
