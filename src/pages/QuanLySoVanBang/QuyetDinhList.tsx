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
  message
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
import dayjs from 'dayjs';
import { IQuyetDinhTotNghiep, IQueryParams } from './types';
import { getDanhSachQuyetDinh, xoaQuyetDinh } from '@/services/QuanLySoVanBang';
import { TenTabQuanLySoVanBang } from './constant';
import FormQuyetDinh from './FormQuyetDinh';

const { Title } = Typography;
const { Search } = Input;

const QuyetDinhList: React.FC = () => {
  const [danhSachQuyetDinh, setDanhSachQuyetDinh] = useState<IQuyetDinhTotNghiep[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<IQuyetDinhTotNghiep | undefined>(undefined);

  // Lấy danh sách quyết định tốt nghiệp
  const fetchDanhSachQuyetDinh = useCallback(async (params: IQueryParams = {}) => {
    setLoading(true);
    try {
      const res = await getDanhSachQuyetDinh({
        page: currentPage,
        limit: pageSize,
        search: searchText,
        ...params
      });
      setDanhSachQuyetDinh(res.data);
      setTotal(res.total);
    } catch (error) {
      message.error('Không thể lấy danh sách quyết định tốt nghiệp');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchText]);

  useEffect(() => {
    fetchDanhSachQuyetDinh();
  }, [fetchDanhSachQuyetDinh]);

  const handleOpenModal = (record?: IQuyetDinhTotNghiep) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord(undefined);
    setModalVisible(false);
  };

  const handleModalFinish = () => {
    fetchDanhSachQuyetDinh();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    try {
      await xoaQuyetDinh(id);
      message.success('Xóa quyết định tốt nghiệp thành công');
      fetchDanhSachQuyetDinh();
    } catch (error) {
      message.error('Không thể xóa quyết định tốt nghiệp');
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
    fetchDanhSachQuyetDinh({ page: 1, search: value });
  };

  const handleResetFilters = () => {
    setSearchText('');
    setCurrentPage(1);
    fetchDanhSachQuyetDinh({ page: 1, search: '' });
  };

  const columns: ColumnsType<IQuyetDinhTotNghiep> = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Số quyết định',
      dataIndex: 'soQuyetDinh',
      key: 'soQuyetDinh',
      width: 150,
    },
    {
      title: 'Ngày ban hành',
      dataIndex: 'ngayBanHanh',
      key: 'ngayBanHanh',
      width: 150,
      render: (ngayBanHanh) => ngayBanHanh ? dayjs(ngayBanHanh).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Trích yếu',
      dataIndex: 'trichYeu',
      key: 'trichYeu',
    },
    {
      title: 'Người ký',
      dataIndex: 'nguoiKy',
      key: 'nguoiKy',
      width: 150,
    },
    {
      title: 'Năm',
      dataIndex: 'nam',
      key: 'nam',
      width: 100,
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
              title="Bạn có chắc chắn muốn xóa quyết định này?"
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
            <Title level={4}>{TenTabQuanLySoVanBang.QUAN_LY_QUYET_DINH}</Title>
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
              placeholder="Tìm kiếm theo số quyết định, trích yếu..."
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
          dataSource={danhSachQuyetDinh}
          rowKey="id"
          loading={loading}
          pagination={{
            total,
            current: currentPage,
            pageSize,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size || 10);
              fetchDanhSachQuyetDinh({ page, limit: size });
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
        title={selectedRecord ? 'Cập nhật quyết định tốt nghiệp' : 'Thêm mới quyết định tốt nghiệp'}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        destroyOnClose
      >
        <FormQuyetDinh
          record={selectedRecord}
          onFinish={handleModalFinish}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default QuyetDinhList; 