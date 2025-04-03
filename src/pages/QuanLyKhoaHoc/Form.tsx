import { Button, Form, Input, InputNumber, Select, message } from 'antd';
import { useModel } from 'umi';
import TinyEditor from '@/components/TinyEditor';

const FormKhoaHoc = () => {
  const { data, getDataKhoaHoc, row, isEdit, setVisible, dsGiangVien } = useModel('khoahoc');

  const trangThaiOptions = [
    { label: 'Đang mở', value: 'DANG_MO' },
    { label: 'Đã kết thúc', value: 'DA_KET_THUC' },
    { label: 'Tạm dừng', value: 'TAM_DUNG' },
  ];

  return (
    <Form
      onFinish={(values) => {
        if (!isEdit) {
          const existingCourse = data.find(
            course => course.tenKhoaHoc === values.tenKhoaHoc
          );
          if (existingCourse) {
            message.error('Tên khóa học đã tồn tại!');
            return;
          }
          values.id = Date.now().toString();
        }

        const index = data.findIndex((item) => item.id === row?.id);
        const dataTemp = [...data];
        
        if (isEdit) {
          dataTemp.splice(index, 1, values);
        } else {
          dataTemp.unshift(values);
        }

        localStorage.setItem('khoahoc', JSON.stringify(dataTemp));
        setVisible(false);
        getDataKhoaHoc();
        message.success(isEdit ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
      }}
      initialValues={row}
    >
      <Form.Item
        label='Tên khóa học'
        name='tenKhoaHoc'
        rules={[
          { required: true, message: 'Vui lòng nhập tên khóa học!' },
          { max: 100, message: 'Tên khóa học tối đa 100 ký tự!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Giảng viên'
        name='giangVien'
        rules={[{ required: true, message: 'Vui lòng chọn giảng viên!' }]}
      >
        <Select options={dsGiangVien.map(gv => ({ label: gv, value: gv }))} />
      </Form.Item>

      <Form.Item
        label='Số lượng học viên'
        name='soLuongHocVien'
        rules={[{ required: true, message: 'Vui lòng nhập số lượng học viên!' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label='Trạng thái'
        name='trangThai'
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
      >
        <Select options={trangThaiOptions} />
      </Form.Item>

      <Form.Item
        label='Mô tả'
        name='moTa'
        rules={[{ required: true, message: 'Vui lòng nhập mô tả khóa học!' }]}
      >
        <TinyEditor />
      </Form.Item>

      <div style={{ textAlign: 'right', gap: 8, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => setVisible(false)}>Hủy</Button>
        <Button type='primary' htmlType='submit'>
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </div>
    </Form>
  );
};

export default FormKhoaHoc;
