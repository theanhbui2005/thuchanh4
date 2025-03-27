import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Button,
  message,
  Row,
  Col,
  Spin
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
import { IVanBang, IQuyetDinhTotNghiep } from './types';
import { ELoaiTotNghiep, TenLoaiTotNghiep } from './constant';
import { themVanBang, capNhatVanBang } from '@/services/QuanLySoVanBang';
import { getDanhSachQuyetDinh } from '@/services/QuanLySoVanBang';
import rules from '@/utils/rules';

interface Props {
  record?: IVanBang;
  onFinish: () => void;
  onCancel: () => void;
}

const FormVanBang: React.FC<Props> = ({ record, onFinish, onCancel }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [danhSachQuyetDinh, setDanhSachQuyetDinh] = useState<IQuyetDinhTotNghiep[]>([]);
  const [loadingQuyetDinh, setLoadingQuyetDinh] = useState<boolean>(false);

  // Lấy danh sách quyết định tốt nghiệp
  const fetchDanhSachQuyetDinh = async () => {
    setLoadingQuyetDinh(true);
    try {
      const res = await getDanhSachQuyetDinh({ page: 1, limit: 1000 });
      setDanhSachQuyetDinh(res.data);
    } catch (error) {
      message.error('Không thể lấy danh sách quyết định tốt nghiệp');
    } finally {
      setLoadingQuyetDinh(false);
    }
  };

  useEffect(() => {
    fetchDanhSachQuyetDinh();

    // Nếu là form sửa, điền thông tin từ record
    if (record) {
      form.setFieldsValue({
        ...record,
        ngay_sinh: record.ngay_sinh ? dayjs(record.ngay_sinh) : undefined,
      });
    }
  }, [record, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formattedData = {
        ...values,
        ngay_sinh: values.ngay_sinh?.format('YYYY-MM-DD'),
      };

      if (record?.id) {
        await capNhatVanBang(record.id, formattedData);
        message.success('Cập nhật văn bằng thành công');
      } else {
        await themVanBang(formattedData);
        message.success('Thêm mới văn bằng thành công');
      }
      onFinish();
    } catch (error) {
      console.error('Lỗi khi lưu văn bằng:', error);
      message.error('Có lỗi xảy ra khi lưu văn bằng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          gioi_tinh: true,
          quoc_tich: 'Việt Nam',
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="so_hieu_van_bang"
              label="Số hiệu văn bằng"
              rules={[...rules.required]}
            >
              <Input placeholder="Nhập số hiệu văn bằng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="so_vao_so"
              label="Số vào sổ"
              rules={[...rules.required]}
            >
              <InputNumber style={{ width: '100%' }} min={1} placeholder="Nhập số vào sổ" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ho_ten"
              label="Họ và tên"
              rules={[...rules.required]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ngay_sinh"
              label="Ngày sinh"
              rules={[...rules.required]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                placeholder="Chọn ngày sinh"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gioi_tinh"
              label="Giới tính"
              rules={[...rules.required]}
            >
              <Select placeholder="Chọn giới tính">
                <Select.Option value={true}>Nam</Select.Option>
                <Select.Option value={false}>Nữ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="noi_sinh"
              label="Nơi sinh"
              rules={[...rules.required]}
            >
              <Input placeholder="Nhập nơi sinh" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dan_toc"
              label="Dân tộc"
              rules={[...rules.required]}
            >
              <Input placeholder="Nhập dân tộc" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quoc_tich"
              label="Quốc tịch"
              rules={[...rules.required]}
            >
              <Input placeholder="Nhập quốc tịch" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="loai_tot_nghiep"
              label="Loại tốt nghiệp"
              rules={[...rules.required]}
            >
              <Select placeholder="Chọn loại tốt nghiệp">
                {Object.values(ELoaiTotNghiep).map((value) => (
                  <Select.Option key={value} value={value}>
                    {TenLoaiTotNghiep[value]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nam_tot_nghiep"
              label="Năm tốt nghiệp"
              rules={[...rules.required]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={2000}
                max={2100}
                placeholder="Nhập năm tốt nghiệp"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="quyet_dinh_id"
          label="Quyết định tốt nghiệp"
          rules={[...rules.required]}
        >
          <Select
            placeholder="Chọn quyết định tốt nghiệp"
            loading={loadingQuyetDinh}
            showSearch
            optionFilterProp="children"
          >
            {danhSachQuyetDinh.map((quyetDinh) => (
              <Select.Option key={quyetDinh.id} value={quyetDinh.id}>
                {quyetDinh.so_quyet_dinh} - {quyetDinh.trich_yeu}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Row justify="end" gutter={8}>
          <Col>
            <Button onClick={onCancel}>Hủy</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={loading}>
              {record?.id ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default FormVanBang; 