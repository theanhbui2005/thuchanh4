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
import { IBieuMauCauHinh, IQueryParams, EKieuDuLieu } from './types';
import { getDanhSachBieuMau, xoaBieuMau } from '@/services/QuanLySoVanBang';
import FormBieuMauCauHinh from './FormBieuMauCauHinh';

const { Title } = Typography;
const { Search } = Input;


const mockData: IBieuMauCauHinh[] = [
  {
    id: '1',
    ten_truong: 'Dân tộc',
    kieu_du_lieu: EKieuDuLieu.STRING,
    mo_ta: 'Dân tộc của sinh viên',
    bat_buoc: true,
    thu_tu: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    ten_truong: 'Nơi sinh',
    kieu_du_lieu: EKieuDuLieu.STRING,
    mo_ta: 'Nơi sinh của sinh viên',
    bat_buoc: true,
    thu_tu: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    ten_truong: 'Điểm trung bình',
    kieu_du_lieu: EKieuDuLieu.NUMBER,
    mo_ta: 'Điểm trung bình của sinh viên',
    bat_buoc: true,
    thu_tu: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    ten_truong: 'Ngày nhập học',
    kieu_du_lieu: EKieuDuLieu.DATE,
    mo_ta: 'Ngày sinh viên nhập học',
    bat_buoc: true,
    thu_tu: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const BieuMauCauHinhList: React.FC = () => {
  const [danhSachBieuMau, setDanhSachBieuMau] = useState<IBieuMauCauHinh[]>([]);
  const [allData, setAllData] = useState<IBieuMauCauHinh[]>(mockData);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<IBieuMauCauHinh | undefined>(undefined);

  
  const filterAndPaginateData = useCallback((data: IBieuMauCauHinh[], text: string, page: number, size: number) => {
    
    const filteredData = text 
      ? data.filter(item => item.ten_truong.toLowerCase().includes(text.toLowerCase()))
      : data;
    
    
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    setDanhSachBieuMau(paginatedData);
    setTotal(filteredData.length);
  }, []);

  
  const fetchDanhSachBieuMau = useCallback(async (params: IQueryParams = {}) => {
    setLoading(true);
    try {
      
      try {
        const res = await getDanhSachBieuMau({
          page: params.page || currentPage,
          limit: params.limit || pageSize,
          search: params.search || searchText,
          ...params
        });
        
        setAllData(res.data);
        setDanhSachBieuMau(res.data);
        setTotal(res.total);
      } catch (apiError) {
        console.log('API không sẵn sàng, sử dụng dữ liệu mẫu');
        
        filterAndPaginateData(
          allData, 
          params.search || searchText, 
          params.page || currentPage, 
          params.limit || pageSize
        );
      }
    } catch (error) {
      message.error('Không thể lấy danh sách cấu hình biểu mẫu');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchText, allData, filterAndPaginateData]);

  useEffect(() => {
    
    filterAndPaginateData(allData, searchText, currentPage, pageSize);
    
    fetchDanhSachBieuMau();
  }, []);

  
  useEffect(() => {
    filterAndPaginateData(allData, searchText, currentPage, pageSize);
  }, [allData, searchText, currentPage, pageSize, filterAndPaginateData]);

  
  const handleOpenModal = (record?: IBieuMauCauHinh) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord(undefined);
    setModalVisible(false);
  };

  const handleModalFinish = (data: IBieuMauCauHinh) => {
 
    const updatedData = [...allData];
    const index = updatedData.findIndex(item => item.id === data.id);
    
    if (index > -1) {
      
      updatedData[index] = data;
    } else {
      
      updatedData.push(data);
    }
    
    setAllData(updatedData);
    
    filterAndPaginateData(updatedData, searchText, currentPage, pageSize);
    
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      try {
        await xoaBieuMau(id);
        message.success('Xóa cấu hình biểu mẫu thành công');
      } catch (error) {
        console.log('API xóa không khả dụng, sử dụng xóa cục bộ', error);
        message.success('Xóa cấu hình biểu mẫu thành công (mô phỏng)');
      }
      
      const updatedData = allData.filter(item => item.id !== id);
      setAllData(updatedData);
      
      filterAndPaginateData(updatedData, searchText, currentPage, pageSize);
    } catch (error) {
      message.error('Không thể xóa cấu hình biểu mẫu');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
    filterAndPaginateData(allData, value, 1, pageSize);
  };

  const handleResetFilters = () => {
    setSearchText('');
    setCurrentPage(1);
    filterAndPaginateData(allData, '', 1, pageSize);
  };

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
          {kieu_du_lieu === EKieuDuLieu.STRING ? 'Chuỗi' : 
           kieu_du_lieu === EKieuDuLieu.NUMBER ? 'Số' : 
           kieu_du_lieu === EKieuDuLieu.DATE ? 'Ngày tháng' : ''}
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
            <Title level={4}>Cấu hình phụ lục văn bằng</Title>
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
              const newSize = size || pageSize;
              setCurrentPage(page);
              setPageSize(newSize);
              filterAndPaginateData(allData, searchText, page, newSize);
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