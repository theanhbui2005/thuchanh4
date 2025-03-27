import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message } from 'antd';
import type { Subject } from '../types';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '@/services/api';

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      message.error('Không thể tải danh sách môn học');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Subject) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSubject(id);
      message.success('Xóa môn học thành công');
      fetchSubjects();
    } catch (error) {
      message.error('Không thể xóa môn học');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingId) {
        await updateSubject(editingId, values);
        message.success('Cập nhật môn học thành công');
      } else {
        await createSubject(values);
        message.success('Thêm môn học thành công');
      }
      setModalVisible(false);
      fetchSubjects();
    } catch (error) {
      message.error('Không thể lưu môn học');
    }
  };

  const columns = [
    {
      title: 'Mã môn',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên môn',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'credits',
      key: 'credits',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Subject) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm môn học
      </Button>
      <Table
        columns={columns}
        dataSource={subjects}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingId ? 'Sửa môn học' : 'Thêm môn học'}
        visible={modalVisible}
        onOk={form.submit}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="code"
            label="Mã môn"
            rules={[{ required: true, message: 'Vui lòng nhập mã môn' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên môn"
            rules={[{ required: true, message: 'Vui lòng nhập tên môn' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="credits"
            label="Số tín chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập số tín chỉ' }]}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubjectManagement;