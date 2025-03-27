import { useState } from 'react';

export const defaultFields: ThongTinVanBang.FormField[] = [
  {
    name: 'diemTrungBinh',
    type: 'number',
    label: 'Điểm trung bình',
    rules: [{ required: true, message: 'Vui lòng nhập điểm trung bình' }],
    min: 0,
    max: 10
  },
  {
    name: 'xepHang',
    type: 'select',
    label: 'Xếp hạng',
    rules: [{ required: true }],
    options: [
      { value: 'XUAT_SAC', label: 'Xuất sắc' },
      { value: 'GIOI', label: 'Giỏi' },
      { value: 'KHA', label: 'Khá' },
      { value: 'TRUNG_BINH', label: 'Trung bình' }
    ]
  },
  {
    name: 'heDaoTao',
    type: 'select',
    label: 'Hệ đào tạo',
    rules: [{ required: true }],
    options: [
      { value: 'CHINH_QUY', label: 'Chính quy' },
      { value: 'TU_XA', label: 'Từ xa' }
    ]
  },
  {
    name: 'noiSinh',
    type: 'text',
    label: 'Nơi sinh',
    rules: [{ required: true }]
  },
  {
    name: 'danToc',
    type: 'text',
    label: 'Dân tộc',
    rules: [{ required: true }]
  }
];

export default () => {
  const [data, setData] = useState<ThongTinVanBang.Record[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<ThongTinVanBang.Record>();

  const getData = () => {
    const savedData = localStorage.getItem('thongTinVanBang');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  };

  const getNextSoVaoSo = () => {
    if (!data.length) return '0001';
    const maxSoVaoSo = Math.max(...data.map(item => parseInt(item.soVaoSo)));
    return (maxSoVaoSo + 1).toString().padStart(4, '0');
  };

  const saveData = async (newData: ThongTinVanBang.Record[]) => {
    localStorage.setItem('thongTinVanBang', JSON.stringify(newData));
    setData(newData);
  };

  return {
    data,
    visible,
    setVisible,
    row,
    setRow,
    isEdit,
    setIsEdit,
    setData,
    getData,
    getNextSoVaoSo,
    saveData,
    formFields: defaultFields
  };
};
