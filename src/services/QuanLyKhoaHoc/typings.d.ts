declare module QuanLyKhoaHoc {
  export type TrangThai = 'DANG_MO' | 'DA_KET_THUC' | 'TAM_DUNG';

  export interface KhoaHoc {
    id: string;
    tenKhoaHoc: string;
    giangVien: string;
    soLuongHocVien: number;
    trangThai: TrangThai;
    moTa: string;
  }
}
