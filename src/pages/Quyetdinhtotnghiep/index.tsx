import { Button, Table, Modal, Tabs } from 'antd';
import { useModel } from 'umi';
import DecisionForm from './Form';


const { TabPane } = Tabs;

const DecisionPage = () => {
  const { 
    decisions, visible, setVisible, isEdit, setIsEdit, 
    selectedDecision, setSelectedDecision, deleteDecision 
  } = useModel('quyetdinhtotnghiep'); 

  const handleEdit = (record: Decision.Record) => {
    setSelectedDecision(record);
    setIsEdit(true);
    setVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa quyết định này?',
      onOk: () => deleteDecision(id),
    });
  };

  const decisionColumns = [
    { title: 'Số QĐ', dataIndex: 'soQuyetDinh', key: 'soQuyetDinh' },
    { title: 'Ngày ban hành', dataIndex: 'ngayBanHanh', key: 'ngayBanHanh' },
    { title: 'Trích yếu', dataIndex: 'trichYeu', key: 'trichYeu' },
    { title: 'ID Sổ văn bằng', dataIndex: 'sovanbangId', key: 'sovanbangId' },
    {
      title: 'Hành động',
      render: (_: any, record: Decision.Record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} type="link" danger>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button 
        type="primary" 
        onClick={() => { 
          setSelectedDecision(null); 
          setIsEdit(false); 
          setVisible(true); 
        }}
        style={{ marginBottom: 16 }}
      >
        Thêm Quyết định tốt nghiệp
      </Button>
      <Table columns={decisionColumns} dataSource={decisions} rowKey="id" />
      
      <Modal 
        title={isEdit ? "Sửa quyết định tốt nghiệp" : "Thêm quyết định tốt nghiệp"}
        visible={visible} 
        footer={null} 
        onCancel={() => setVisible(false)}
      >
     <DecisionForm />
      </Modal>
    </div>
  );
};

export default DecisionPage;
