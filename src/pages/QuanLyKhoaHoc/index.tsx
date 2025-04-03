import { Button, Input, Modal, Select, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import FormKhoaHoc from './Form';
import type { IColumn } from '@/components/Table/typing';

const QuanLyKhoaHoc = () => {
  const { data, getDataKhoaHoc, setRow, isEdit, setVisible, setIsEdit, visible, dsGiangVien } = 
    useModel('khoahoc');
  const [searchText, setSearchText] = useState('');
  const [filterGiangVien, setFilterGiangVien] = useState<string>();
  const [filterTrangThai, setFilterTrangThai] = useState<string>();

  useEffect(() => {
    getDataKhoaHoc();
  }, []);

  const trangThaiOptions = [
    { label: 'Đang mở', value: 'DANG_MO' },
    { label: 'Đã kết thúc', value: 'DA_KET_THUC' },
    { label: 'Tạm dừng', value: 'TAM_DUNG' },
  ];

  const columns: IColumn<QuanLyKhoaHoc.KhoaHoc>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      width: 200,
    },
    {
      title: 'Giảng viên',
      dataIndex: 'giangVien',
      width: 150,
    },
    {
      title: 'Số lượng học viên',
      dataIndex: 'soLuongHocVien',
      width: 150,
      sorter: (a, b) => a.soLuongHocVien - b.soLuongHocVien,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      width: 150,
      render: (trangThai) => 
        trangThaiOptions.find(opt => opt.value === trangThai)?.label
    },
    {
      title: 'Thao tác',
      width: 200,
      align: 'center',
      render: (record) => (
        <div>
          <Button
            onClick={() => {
              setVisible(true);
              setRow(record);
              setIsEdit(true);
            }}
          >
            Sửa
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            danger
            onClick={() => {
              if (record.soLuongHocVien > 0) {
                message.error('Không thể xóa khóa học đã có học viên!');
                return;
              }
              Modal.confirm({
                title: 'Xác nhận xóa?',
                content: 'Bạn có chắc chắn muốn xóa khóa học này?',
                onOk: () => {
                  const dataLocal = JSON.parse(localStorage.getItem('khoahoc') || '[]');
                  const newData = dataLocal.filter((item: any) => item.id !== record.id);
                  localStorage.setItem('khoahoc', JSON.stringify(newData));
                  getDataKhoaHoc();
                  message.success('Xóa thành công!');
                }
              });
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const filteredData = data.filter(item => 
    item.tenKhoaHoc.toLowerCase().includes(searchText.toLowerCase()) &&
    (!filterGiangVien || item.giangVien === filterGiangVien) &&
    (!filterTrangThai || item.trangThai === filterTrangThai)
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type='primary'
          onClick={() => {
            setVisible(true);
            setIsEdit(false);
            setRow(undefined);
          }}
        >
          Thêm khóa học
        </Button>
      </div>

      <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
        <Input.Search 
          placeholder="Tìm theo tên khóa học"
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          allowClear
          placeholder="Lọc theo giảng viên"
          style={{ width: 200 }}
          options={dsGiangVien.map(gv => ({ label: gv, value: gv }))}
          onChange={setFilterGiangVien}
        />
        <Select
          allowClear
          placeholder="Lọc theo trạng thái"
          style={{ width: 200 }}
          options={trangThaiOptions}
          onChange={setFilterTrangThai}
        />
      </div>

      <Table dataSource={filteredData} columns={columns} />

      <Modal
        destroyOnClose
        footer={false}
        title={isEdit ? 'Sửa khóa học' : 'Thêm khóa học mới'}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <FormKhoaHoc />
      </Modal>
    </div>
  );
};

export default QuanLyKhoaHoc;
