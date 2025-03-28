import { Button, Table, Modal, Tabs } from 'antd';
import { useModel } from 'umi';
import SovanbangForm from './Form';

const { TabPane } = Tabs;

const SovanbangPage = () => {
  const { 
    sovanbangs, visible, setVisible, isEdit, setIsEdit, selectedSovanbang, setSelectedSovanbang, deleteSovanbang
  } = useModel('quanlysovanbang');

  const handleEdit = (record: Sovanbang.Record) => {
    setSelectedSovanbang(record);
    setIsEdit(true);
    setVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa?',
      onOk: () => deleteSovanbang(id),
    });
  };

  const sovanbangColumns = [
    { title: 'ID', dataIndex: 'ID', key: 'ID' },
    { title: 'Tên', dataIndex: 'studentName', key: 'studentName' },
    { title: 'Số hiệu văn bằng', dataIndex: 'diplomaCode', key: 'diplomaCode' },
    { 
      title: 'Số vào sổ', 
      dataIndex: 'entryNumber',
      key: 'entryNumber',
    },
    { title: 'Năm cấp', dataIndex: 'year', key: 'year' },
    {
      title: 'Hành động',
      render: (_: any, record: Sovanbang.Record) => (
        <>
          <Button onClick={() => handleEdit(record)} type='link'>Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} type='link' danger>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button 
        type='primary' 
        onClick={() => { 
          setSelectedSovanbang(null); 
          setIsEdit(false); 
          setVisible(true); 
        }}
        style={{ marginBottom: 16 }}
      >
        Thêm Sổ Văn Bằng
      </Button>
      <Table columns={sovanbangColumns} dataSource={sovanbangs} rowKey="id" />
      
      <Modal 
        title={isEdit ? "Sửa sổ văn bằng" : "Thêm sổ văn bằng"}
        visible={visible} 
        footer={null} 
        onCancel={() => setVisible(false)}
      >
        <SovanbangForm />
      </Modal>
    </div>
  );
};

export default SovanbangPage;
