import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Tag,
  Card,
  Tooltip,
  Row,
  Col,
  Input,
  Modal,
  Typography,
  message,
  DatePicker,
  Form
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  CheckCircleOutlined,
  StopOutlined,
  ExportOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { IVanBang, ETrangThaiVanBang, IQueryParams } from './types';
import { getDanhSachVanBang, xoaVanBang, capVanBang, huyVanBang } from '@/services/QuanLySoVanBang';
import { ELoaiTotNghiep, TenLoaiTotNghiep, MauTrangThaiVanBang, TenTabQuanLySoVanBang } from './constant';
import FormVanBang from './FormVanBang';

const { Title, Text } = Typography;
const { Search } = Input;

const VanBangList: React.FC = () => {
  const [danhSachVanBang, setDanhSachVanBang] = useState<IVanBang[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<IVanBang | undefined>(undefined);
  const [modalCapBangVisible, setModalCapBangVisible] = useState<boolean>(false);
  const [selectedVanBangId, setSelectedVanBangId] = useState<string>('');
  const [ngayCapBang, setNgayCapBang] = useState<dayjs.Dayjs | null>(dayjs());

  // Lấy danh sách văn bằng
  const fetchDanhSachVanBang = useCallback(async (params: IQueryParams = {}) => {
    setLoading(true);
    try {
      const res = await getDanhSachVanBang({
        page: currentPage,
        limit: pageSize,
        search: searchText,
        ...params
      });
      setDanhSachVanBang(res.data);
      setTotal(res.total);
    } catch (error) {
      message.error('Không thể lấy danh sách văn bằng');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchText]);

  useEffect(() => {
    fetchDanhSachVanBang();
  }, [fetchDanhSachVanBang]);

  // Xử lý thêm mới và cập nhật văn bằng
  const handleOpenModal = (record?: IVanBang) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord(undefined);
    setModalVisible(false);
  };

  const handleModalFinish = () => {
    fetchDanhSachVanBang();
    handleCloseModal();
  };

  // Xử lý xóa văn bằng
  const handleDelete = async (id: string) => {
    try {
      await xoaVanBang(id);
      message.success('Xóa văn bằng thành công');
      fetchDanhSachVanBang();
    } catch (error) {
      message.error('Không thể xóa văn bằng');
    }
  };

  // Xử lý cấp văn bằng
  const handleOpenCapBangModal = (id: string) => {
    setSelectedVanBangId(id);
    setNgayCapBang(dayjs());
    setModalCapBangVisible(true);
  };

  const handleCapBang = async () => {
    try {
      await capVanBang(selectedVanBangId, ngayCapBang?.format('YYYY-MM-DD') || '');
      message.success('Cấp văn bằng thành công');
      fetchDanhSachVanBang();
      setModalCapBangVisible(false);
    } catch (error) {
      message.error('Không thể cấp văn bằng');
    }
  };

  // Xử lý hủy văn bằng
  const handleHuyBang = async (id: string) => {
    try {
      await huyVanBang(id);
      message.success('Hủy văn bằng thành công');
      fetchDanhSachVanBang();
    } catch (error) {
      message.error('Không thể hủy văn bằng');
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
    fetchDanhSachVanBang({ page: 1, search: value });
  };

  // Xử lý reset bộ lọc
  const handleResetFilters = () => {
    setSearchText('');
    setCurrentPage(1);
    fetchDanhSachVanBang({ page: 1, search: '' });
  };

  // Định nghĩa các cột trong bảng
  const columns: ColumnsType<IVanBang> = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Số hiệu',
      dataIndex: 'soHieuVanBang',
      key: 'soHieuVanBang',
      width: 120,
    },
    {
      title: 'Số vào sổ',
      dataIndex: 'soVaoSo',
      key: 'soVaoSo',
      width: 100,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
      key: 'ngaySinh',
      width: 120,
      render: (ngaySinh) => ngaySinh ? dayjs(ngaySinh).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Loại tốt nghiệp',
      dataIndex: 'loaiTotNghiep',
      key: 'loaiTotNghiep',
      width: 150,
      render: (loaiTotNghiep) => TenLoaiTotNghiep[loaiTotNghiep as ELoaiTotNghiep] || loaiTotNghiep,
    },
    {
      title: 'Năm tốt nghiệp',
      dataIndex: 'namTotNghiep',
      key: 'namTotNghiep',
      width: 120,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      render: (trangThai: ETrangThaiVanBang) => (
        <Tag color={MauTrangThaiVanBang[trangThai]}>
          {trangThai === ETrangThaiVanBang.CHUA_CAP && 'Chưa cấp'}
          {trangThai === ETrangThaiVanBang.DA_CAP && 'Đã cấp'}
          {trangThai === ETrangThaiVanBang.HUY && 'Hủy'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<FileSearchOutlined />}
              size="small"
              onClick={() => handleOpenModal(record)}
            />
          </Tooltip>
          
          {record.trangThai === ETrangThaiVanBang.CHUA_CAP && (
            <>
              <Tooltip title="Sửa">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => handleOpenModal(record)}
                />
              </Tooltip>
              
              <Tooltip title="Cấp văn bằng">
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  size="small"
                  style={{ backgroundColor: '#52c41a' }}
                  onClick={() => handleOpenCapBangModal(record.id)}
                />
              </Tooltip>
              
              <Tooltip title="Xóa">
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa văn bằng này?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                  />
                </Popconfirm>
              </Tooltip>
            </>
          )}
          
          {record.trangThai === ETrangThaiVanBang.DA_CAP && (
            <Tooltip title="Hủy văn bằng">
              <Popconfirm
                title="Bạn có chắc chắn muốn hủy văn bằng này?"
                onConfirm={() => handleHuyBang(record.id)}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  danger
                  icon={<StopOutlined />}
                  size="small"
                />
              </Popconfirm>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={16}>
            <Title level={4}>{TenTabQuanLySoVanBang.QUAN_LY_VAN_BANG}</Title>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleOpenModal()}
              >
                Thêm mới
              </Button>
              <Button icon={<ExportOutlined />}>Xuất Excel</Button>
            </Space>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Search
              placeholder="Tìm kiếm theo họ tên, số hiệu văn bằng..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
            />
          </Col>
          <Col>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleResetFilters}
            >
              Làm mới
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={danhSachVanBang}
          rowKey="id"
          loading={loading}
          pagination={{
            total,
            current: currentPage,
            pageSize,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size || 10);
              fetchDanhSachVanBang({ page, limit: size });
            },
            showSizeChanger: true,
            showTotal: (total) => `Tổng số: ${total} bản ghi`,
          }}
          size="middle"
          scroll={{ x: 1100 }}
        />
      </Card>

      {/* Modal thêm mới / cập nhật văn bằng */}
      <Modal
        title={selectedRecord ? 'Cập nhật văn bằng' : 'Thêm mới văn bằng'}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        destroyOnClose
      >
        <FormVanBang
          record={selectedRecord}
          onFinish={handleModalFinish}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Modal cấp văn bằng */}
      <Modal
        title="Cấp văn bằng"
        visible={modalCapBangVisible}
        onCancel={() => setModalCapBangVisible(false)}
        onOk={handleCapBang}
        okText="Cấp văn bằng"
        cancelText="Hủy"
      >
        <div style={{ marginBottom: 16 }}>
          <Text>Xác nhận cấp văn bằng với thông tin dưới đây:</Text>
        </div>
        <Form.Item label="Ngày cấp" required>
          <DatePicker
            value={ngayCapBang}
            onChange={(date) => setNgayCapBang(date)}
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default VanBangList; 