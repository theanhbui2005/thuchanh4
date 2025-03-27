import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Card,
  Tooltip,
  Row,
  Col,
  Input,
  Modal,
  Typography,
  message,
  Tag
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { IBieuMauCauHinh, IQueryParams } from './types';
import { getDanhSachBieuMau, xoaBieuMau } from '@/services/QuanLySoVanBang';
import { EKieuDuLieu, TenKieuDuLieu, TenTabQuanLySoVanBang } from './constant';
import FormBieuMauCauHinh from './FormBieuMauCauHinh';

const { Title } = Typography;
const { Search } = Input;

const BieuMauCauHinhList: React.FC = () => {
  const [danhSachBieuMau, setDanhSachBieuMau] = useState<IBieuMauCauHinh[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<IBieuMauCauHinh | undefined>(undefined);

  const fetchDanhSachBieuMau = useCallback(async (params: IQueryParams = {}) => {
    setLoading(true);
    try {
      const res = await getDanhSachBieuMau({
        page: currentPage,
        limit: pageSize,
        search: searchText,
        ...params
      });
      setDanhSachBieuMau(res.data);
      setTotal(res.total);
    } catch (error) {
      message.error('Không thể lấy danh sách cấu hình biểu mẫu');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchText]);

  useEffect(() => {
    fetchDanhSachBieuMau();
  }, [fetchDanhSachBieuMau]);

  const handleOpenModal = (record?: IBieuMauCauHinh) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord(undefined);
    setModalVisible(false);
  };

  const handleModalFinish = () => {
    fetchDanhSachBieuMau();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    try {
      await xoaBieuMau(id);
      message.success('Xóa cấu hình biểu mẫu thành công');
      fetchDanhSachBieuMau();
    } catch (error) {
      message.error('Không thể xóa cấu hình biểu mẫu');
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
    fetchDanhSachBieuMau({ page: 1, search: value });
  };

  // Xử lý reset bộ lọc
  const handleResetFilters = () => {
    setSearchText('');
    setCurrentPage(1);
    fetchDanhSachBieuMau({ page: 1, search: '' });
  };

  // Định nghĩa các cột trong bảng
  const columns: ColumnsType<IBieuMauCauHinh> = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Tên trường thông tin',
      dataIndex: 'ten_truong',
      key: 'ten_truong',
    },
    {
      title: 'Kiểu dữ liệu',
      dataIndex: 'kieu_du_lieu',
      key: 'kieu_du_lieu',
      width: 120,
      render: (kieu_du_lieu: EKieuDuLieu) => (
        <Tag color={
          kieu_du_lieu === EKieuDuLieu.STRING ? 'blue' :
          kieu_du_lieu === EKieuDuLieu.NUMBER ? 'green' :
          kieu_du_lieu === EKieuDuLieu.DATE ? 'orange' :
          'default'
        }>
          {TenKieuDuLieu[kieu_du_lieu]}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Sửa">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleOpenModal(record)}
            />
          </Tooltip>
          
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa trường thông tin này?"
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
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={16}>
            <Title level={4}>{TenTabQuanLySoVanBang.CAU_HINH_PHU_LUC}</Title>
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
              placeholder="Tìm kiếm theo tên trường thông tin..."
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
          dataSource={danhSachBieuMau}
          rowKey="id"
          loading={loading}
          pagination={{
            total,
            current: currentPage,
            pageSize,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size || 10);
              fetchDanhSachBieuMau({ page, limit: size });
            },
            showSizeChanger: true,
            showTotal: (total) => `Tổng số: ${total} bản ghi`,
          }}
          size="middle"
          scroll={{ x: 1000 }}
        />
      </Card>

      {}
      <Modal
        title={selectedRecord ? 'Cập nhật cấu hình biểu mẫu' : 'Thêm mới cấu hình biểu mẫu'}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        destroyOnClose
      >
        <FormBieuMauCauHinh
          record={selectedRecord}
          onFinish={handleModalFinish}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default BieuMauCauHinhList; 