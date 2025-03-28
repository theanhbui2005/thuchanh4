import { useState } from 'react';

const useSovanbangModel = () => {
  // State cho sổ văn bằng
  const [sovanbangs, setSovanbangs] = useState<Sovanbang.Record[]>(() => {
    // Lấy dữ liệu sổ văn bằng từ localStorage (nếu có)
    return JSON.parse(localStorage.getItem('sovanbangs') || '[]');
  });

  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedSovanbang, setSelectedSovanbang] = useState<Sovanbang.Record | null>(null);

 
const addSovanbang = (sovanbang: Omit<Sovanbang.Record, 'id'>) => {
  const maxId = sovanbangs.reduce((max, emp) => Math.max(max, emp.id), 0);
  
  // Tính toán số vào sổ
  const lastEntryNumber = sovanbangs.length > 0 ? sovanbangs[sovanbangs.length - 1].entryNumber : 0;
  const newEntryNumber = (lastEntryNumber % 5) + 1; // Tăng dần từ 1 đến 5

  const newSovanbang = { ...sovanbang, id: maxId + 1, entryNumber: newEntryNumber }; // Thêm entryNumber vào đối tượng mới
  const newSovanbangs = [...sovanbangs, newSovanbang];
  localStorage.setItem('sovanbangs', JSON.stringify(newSovanbangs));
  setSovanbangs(newSovanbangs);
};
const updateSovanbang = (updated: Sovanbang.Record) => {
  const newSovanbangs = sovanbangs.map((item) =>
    item.id === updated.id ? updated : item
  );
  localStorage.setItem('sovanbangs', JSON.stringify(newSovanbangs));
  setSovanbangs(newSovanbangs);
};

// Xóa một sổ văn bằng
const deleteSovanbang = (id: number) => {
  const newSovanbangs = sovanbangs.filter((item) => item.id !== id);
  localStorage.setItem('sovanbangs', JSON.stringify(newSovanbangs));
  setSovanbangs(newSovanbangs);
};

// Trả về tất cả biến và hàm để sử dụng ở component khác
return {
  sovanbangs,
  setSovanbangs,
  visible,
  setVisible,
  isEdit,
  setIsEdit,
  selectedSovanbang,
  setSelectedSovanbang,
  addSovanbang,
  updateSovanbang,
  deleteSovanbang,
};
};

export default useSovanbangModel;
