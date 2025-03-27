declare module ThongTinVanBang {
  type FieldType = 'text' | 'number' | 'select' | 'date';

  interface FormField {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    options?: { label: string; value: any }[];
    min?: number;
    max?: number;
  }

  interface Record {
    soVaoSo: string;
    soHieuVanBang: string;
    maSinhVien: string;
    hoTen: string;
    ngaySinh: string;
    quyetDinhTotNghiep: string;
    [key: string]: any; // For dynamic fields
  }
}
