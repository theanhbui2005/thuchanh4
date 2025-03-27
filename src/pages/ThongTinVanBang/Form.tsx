import MyDatePicker from '@/components/MyDatePicker';
import { Button, Form, Input, InputNumber, Select, Row, Col } from 'antd';
import { useModel } from 'umi';


const FormThongTinVanBang = () => {
  const { data, row, isEdit, setVisible, formFields, getNextSoVaoSo, saveData } = useModel('thongTinVanBang');
  const [form] = Form.useForm();

  const onFinish = async (values: ThongTinVanBang.Record) => {
    const dataLocal = [...data];
    
    if (isEdit) {
      const index = dataLocal.findIndex(item => item.soVaoSo === row?.soVaoSo);
      dataLocal[index] = { ...row, ...values };
    } else {
      values.soVaoSo = getNextSoVaoSo();
      dataLocal.push(values);
    }
    
    await saveData(dataLocal);
    setVisible(false);
  };

  const renderFormItem = (field: ThongTinVanBang.FormField) => {
    switch (field.type) {
      case 'number':
        return <InputNumber 
          style={{ width: '100%' }}
          min={field.min}
          max={field.max}
        />;
      case 'select':
        return <Select options={field.options} />;
      default:
        return <Input />;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={row}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Số vào sổ" name="soVaoSo">
            <Input disabled placeholder={isEdit ? undefined : getNextSoVaoSo()} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số hiệu văn bằng"
            name="soHieuVanBang"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Mã sinh viên"
            name="maSinhVien"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Ngày sinh"
            name="ngaySinh"
            rules={[{ required: true }]}
          >
            <MyDatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Quyết định tốt nghiệp"
            name="quyetDinhTotNghiep"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {formFields.map(field => (
          <Col span={12} key={field.name}>
            <Form.Item
              label={field.label}
              name={field.name}
              rules={field.rules}
            >
              {renderFormItem(field)}
            </Form.Item>
          </Col>
        ))}
      </Row>

      <div className='form-footer'>
        <Button htmlType='submit' type='primary'>
          {isEdit ? 'Lưu thay đổi' : 'Thêm mới'}
        </Button>
        <Button onClick={() => setVisible(false)} style={{ marginLeft: 8 }}>Hủy</Button>
      </div>
    </Form>
  );
};

export default FormThongTinVanBang;
