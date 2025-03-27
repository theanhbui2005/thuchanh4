import React from 'react';
import { Card } from 'antd';
import BieuMauCauHinhList from './BieuMauCauHinhList';

const QuanLySoVanBang: React.FC = () => {
  return (
    <Card bordered={false}>
      <h2>Cấu hình phụ lục văn bằng</h2>
      <BieuMauCauHinhList />
    </Card>
  );
};

export default QuanLySoVanBang; 