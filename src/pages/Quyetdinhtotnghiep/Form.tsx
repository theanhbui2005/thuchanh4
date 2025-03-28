import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';

const DecisionForm = () => {
  const { addDecision, updateDecision, selectedDecision, isEdit, setVisible } = useModel('quyetdinhtotnghiep');

  return (
    <Form
    initialValues={selectedDecision || {}}
      onFinish={(values) => {
        if (isEdit && selectedDecision) {
          const updatedDecision = { ...selectedDecision, ...values };
          updateDecision(updatedDecision);
        } else {
          addDecision(values);
        }
        setVisible(false);
      }}
    >
      <Form.Item
        label="Số QĐ"
        name="soQuyetDinh"
        rules={[{ required: true, message: 'Vui lòng nhập số quyết định!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ngày ban hành"
        name="ngayBanHanh"
        rules={[{ required: true, message: 'Vui lòng nhập ngày ban hành!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Trích yếu"
        name="trichYeu"
        rules={[{ required: true, message: 'Vui lòng nhập trích yếu!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ID Sổ văn bằng"
        name="sovanbangId"
        rules={[{ required: true, message: 'Vui lòng nhập ID!' }]}
      >
        <Input  />
      </Form.Item>

      <div className="form-footer">
        <Button htmlType="submit" type="primary">
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </Button>
        <Button onClick={() => setVisible(false)}>Hủy</Button>
      </div>
    </Form>
  );
};

export default DecisionForm;
