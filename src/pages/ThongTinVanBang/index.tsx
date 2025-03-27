import { useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { useModel } from 'umi';
import type { IColumn } from '@/components/Table/typing';
import FormThongTinVanBang from './Form';

const ThongTinVanBang = () => {
  const { data, getData, setRow, isEdit, setVisible, setIsEdit, visible } = useModel('thongTinVAnBang');

  useEffect(() => {
    getData();
  }, []);

  const columns: IColumn<ThongTinVanBang.Record>[] = [
    {
      title: 'Số vào sổ',
      dataIndex: 'soVaoSo',
      width: 100,
    },
    {
      title: 'Số hiệu văn bằng',
      dataIndex: 'soHieuVanBang',
      width: 150,
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      width: 200,
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'maSinhVien',
      width: 120,
    },
    {
      title: 'Quyết định TN',
      dataIndex: 'quyetDinhTotNghiep',
      width: 150,
    },
    {
      title: 'Thao tác',
      width: 120,
      align: 'center',
      render: (record) => (
        <Button
          onClick={() => {
            setVisible(true);
            setRow(record);
            setIsEdit(true);
          }}
        >
          Chỉnh sửa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
          setIsEdit(false);
          setRow(undefined);
        }}
      >
        Thêm mới
      </Button>

      <Table dataSource={data} columns={columns} />

      <Modal
        destroyOnClose
        footer={false}
        title={isEdit ? 'Chỉnh sửa thông tin văn bằng' : 'Thêm mới thông tin văn bằng'}
        visible={visible}
        onCancel={() => setVisible(false)}
        width={800}
      >
        <FormThongTinVanBang />
      </Modal>
    </div>
  );
};

export default ThongTinVanBang;
