import { Button, Form, Input, InputNumber } from 'antd';
import { useModel } from 'umi';

const ServiceForm = () => {
  const { addService, updateService, selectedService, isEditService, setServiceVisible } = useModel('quanlynhanvien');

  return (
    <Form
      initialValues={selectedService || {}}
      onFinish={(values) => {
        if (isEditService && selectedService) {
          const updatedService = { ...selectedService, ...values };
          updateService(updatedService);
        } else {
          addService(values);
        }
        setServiceVisible(false);
      }}
    >
      <Form.Item
        label='Tên dịch vụ'
        name='name'
        rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Giá (VNĐ)'
        name='price'
        rules={[{ required: true, message: 'Vui lòng nhập giá dịch vụ!' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label='Thời gian thực hiện (phút)'
        name='duration'
        rules={[{ required: true, message: 'Vui lòng nhập thời gian thực hiện!' }]}
      >
        <InputNumber min={1} max={480} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label='Mô tả'
        name='description'
      >
        <Input.TextArea />
      </Form.Item>

      <div className='form-footer'>
        <Button htmlType='submit' type='primary'>
          {isEditService ? 'Cập nhật' : 'Thêm mới'}
        </Button>
        <Button onClick={() => setServiceVisible(false)}>Hủy</Button>
      </div>
    </Form>
  );
};

export default ServiceForm; 