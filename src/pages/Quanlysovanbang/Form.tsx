import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';



const SovanbangForm = () => {
  const { addSovanbang, updateSovanbang, selectedSovanbang, isEdit, setVisible } = useModel('quanlysovanbang');

  return (
    <Form
    initialValues={{
      ...selectedSovanbang,
    }}
      onFinish={(values) => {
        if (isEdit && selectedSovanbang) {
          const updatedDiploma = { ...selectedSovanbang, ...values };
          updatedDiploma.entryNumber = selectedSovanbang.entryNumber;
          updateSovanbang(updatedDiploma);
        } else {
          addSovanbang(values);
        }
        setVisible(false);
      }}
    >
      <Form.Item
        label='ID' 
        name='ID'
        rules={[{ required: true, message: 'Vui lòng nhập họ tên ID!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Họ và tên sinh viên' 
        name='studentName'
        rules={[{ required: true, message: 'Vui lòng nhập họ tên sinh viên!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Số vào sổ'
        name='entryNumber'
      >
        <Input disabled value={selectedSovanbang ? selectedSovanbang.entryNumber : undefined} />
      </Form.Item>

      <Form.Item
        label='Số hiệu văn bằng'
        name='diplomaCode'
        rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng!' }]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label='Năm cấp'
        name='year'
        rules={[{ required: true, message: 'Vui lòng nhập năm cấp!' }]}
      >
        <Input  />
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

export default SovanbangForm;
