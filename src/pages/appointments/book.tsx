import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import moment from "moment";
import { getEmployees } from "@/services/api"; // Giả định đã có từ mục 1
import { createAppointment } from "@/services/api";

const { Option } = Select;

const BookAppointment: React.FC = () => {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // Lấy danh sách nhân viên
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        message.error("Không thể tải danh sách nhân viên");
      }
    };
    fetchEmployees();
  }, []);

  // Giả lập kiểm tra lịch trống
  const checkAvailableTimes = (date: any, employeeId: string) => {
    // Logic kiểm tra lịch trống (giả lập)
    const allTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
    // Gọi API để lấy lịch hẹn của nhân viên trong ngày đó và lọc ra khung giờ trống
    setAvailableTimes(allTimes); // Thay bằng logic thực tế
  };

  const onFinish = async (values: any) => {
    try {
      const appointmentData = {
        employeeId: values.employee,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time,
        customerName: values.customerName,
        status: "Pending",
      };
      await createAppointment(appointmentData);
      message.success("Đặt lịch hẹn thành công");
      form.resetFields();
    } catch (error) {
      message.error("Không thể đặt lịch hẹn");
    }
  };

  return (
    <div>
      <h2>Đặt lịch hẹn</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="customerName"
          label="Tên khách hàng"
          rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="employee"
          label="Nhân viên phục vụ"
          rules={[{ required: true, message: "Vui lòng chọn nhân viên" }]}
        >
          <Select
            onChange={(value) => checkAvailableTimes(form.getFieldValue("date"), value)}
          >
            {employees.map((emp) => (
              <Option key={emp.id} value={emp.id}>
                {emp.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="Ngày hẹn"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            onChange={(date) => checkAvailableTimes(date, form.getFieldValue("employee"))}
            disabledDate={(current) => current && current < moment().startOf("day")}
          />
        </Form.Item>
        <Form.Item
          name="time"
          label="Giờ hẹn"
          rules={[{ required: true, message: "Vui lòng chọn giờ" }]}
        >
          <Select>
            {availableTimes.map((time) => (
              <Option key={time} value={time}>
                {time}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Đặt lịch
        </Button>
      </Form>
    </div>
  );
};

export default BookAppointment;