import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  message,
  Row,
  Col,
  Spin,
  InputNumber,
  Select
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import dayjs from 'dayjs';
import { IQuyetDinhTotNghiep, ISoVanBang } from './types';
import { themQuyetDinh, capNhatQuyetDinh, getDanhSachSoVanBang } from '@/services/QuanLySoVanBang';
import rules from '@/utils/rules';
import TextArea from 'antd/lib/input/TextArea';

interface Props {
  record?: IQuyetDinhTotNghiep;
  onFinish: () => void;
  onCancel: () => void;
}

const FormQuyetDinh: React.FC<Props> = ({ record, onFinish, onCancel }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [danhSachSoVanBang, setDanhSachSoVanBang] = useState<ISoVanBang[]>([]);
  const [loadingSoVanBang, setLoadingSoVanBang] = useState<boolean>(false);

  // Lấy danh sách sổ văn bằng
  const fetchDanhSachSoVanBang = async () => {
    setLoadingSoVanBang(true);
    try {
      const res = await getDanhSachSoVanBang({ page: 1, limit: 1000 });
      setDanhSachSoVanBang(res.data);
    } catch (error) {
      message.error('Không thể lấy danh sách sổ văn bằng');
    } finally {
      setLoadingSoVanBang(false);
    }
  };

  useEffect(() => {
    fetchDanhSachSoVanBang();

    if (record) {
      form.setFieldsValue({
        ...record,
        ngay_ban_hanh: record.ngay_ban_hanh ? dayjs(record.ngay_ban_hanh) : undefined,
      });
    }
  }, [record, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formattedData = {
        ...values,
        ngay_ban_hanh: values.ngay_ban_hanh?.format('YYYY-MM-DD'),
      };

      if (record?.id) {
        await capNhatQuyetDinh(record.id, formattedData);
        message.success('Cập nhật quyết định tốt nghiệp thành công');
      } else {
        await themQuyetDinh(formattedData);
        message.success('Thêm mới quyết định tốt nghiệp thành công');
      }
      onFinish();
    } catch (error) {
      console.error('Lỗi khi lưu quyết định tốt nghiệp:', error);
      message.error('Có lỗi xảy ra khi lưu quyết định tốt nghiệp');
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
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="so_quyet_dinh"
              label="Số quyết định"
              rules={[...rules.required]}
            >
              <Input placeholder="Nhập số quyết định" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ngay_ban_hanh"
              label="Ngày ban hành"
              rules={[...rules.required]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                placeholder="Chọn ngày ban hành"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="trich_yeu"
          label="Trích yếu"
          rules={[...rules.required]}
        >
          <TextArea rows={3} placeholder="Nhập trích yếu quyết định" />
        </Form.Item>

        <Form.Item
          name="so_van_bang_id"
          label="Sổ văn bằng"
          rules={[...rules.required]}
        >
          <Select
            placeholder="Chọn sổ văn bằng"
            loading={loadingSoVanBang}
            showSearch
            optionFilterProp="children"
          >
            {danhSachSoVanBang.map((soVanBang) => (
              <Select.Option key={soVanBang.id} value={soVanBang.id}>
                Sổ văn bằng năm {soVanBang.nam}
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

export default FormQuyetDinh; 