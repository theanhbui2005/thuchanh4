import { useState } from 'react';

export default () => {
  const [data, setData] = useState<QuanLyKhoaHoc.KhoaHoc[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<QuanLyKhoaHoc.KhoaHoc>();

  const getDataKhoaHoc = async () => {
    const dataLocal = JSON.parse(localStorage.getItem('khoahoc') || '[]');
    setData(dataLocal);
  };

  const dsGiangVien = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'];

  return {
    data,
    visible,
    setVisible,
    row,
    setRow,
    isEdit,
    setIsEdit,
    setData,
    getDataKhoaHoc,
    dsGiangVien,
  };
};
