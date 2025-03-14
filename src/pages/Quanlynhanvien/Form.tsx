import { Button, Form, Input, InputNumber } from 'antd';
import { useModel } from 'umi';

const EmployeeForm = () => {
  const { addEmployee, updateEmployee, selectedEmployee, isEdit, setVisible } = useModel('quanlynhanvien');

  return (
    <Form
      initialValues={selectedEmployee || {}}
      onFinish={(values) => {
        if (isEdit && selectedEmployee) {
          const updatedEmployee = { ...selectedEmployee, ...values };
          updateEmployee(updatedEmployee);
        } else {
          addEmployee(values);
        }
        setVisible(false);
      }}
    >
      <Form.Item
        label='Họ và tên'
        name='name'
        rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Tuổi'
        name='age'
        rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}
      >
        <InputNumber min={18} max={65} />
      </Form.Item>

      <Form.Item
        label='Giờ làm việc'
        name='workingHours'
        rules={[{ required: true, message: 'Vui lòng nhập giờ làm việc!' }]}
      >
        <Input placeholder="Ví dụ: 9h-17h" />
      </Form.Item>

      <Form.Item
        label='Ngày làm việc'
        name='workingDays'
        rules={[{ required: true, message: 'Vui lòng nhập ngày làm việc!' }]}
      >
        <Input placeholder="Ví dụ: Thứ 2 - Thứ 6" />
      </Form.Item>

      <Form.Item
        label='Số khách/ngày'
        name='maxAppointmentsPerDay'
        rules={[{ required: true, message: 'Vui lòng nhập số khách tối đa/ngày!' }]}
      >
        <InputNumber min={1} max={20} />
      </Form.Item>

      <div className='form-footer'>
        <Button htmlType='submit' type='primary'>
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </Button>
        <Button onClick={() => setVisible(false)}>Hủy</Button>
      </div>
    </Form>
  );
};

export default EmployeeForm;
