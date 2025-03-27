export enum EKieuDuLieu {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  DATE = 'DATE'
}
export const TenKieuDuLieu: Record<EKieuDuLieu, string> = {
  [EKieuDuLieu.STRING]: 'Chuỗi',
  [EKieuDuLieu.NUMBER]: 'Số',
  [EKieuDuLieu.DATE]: 'Ngày tháng'
};
export interface IBieuMauCauHinh {
  id: string;
  ten_truong: string;
  kieu_du_lieu: EKieuDuLieu;
  mo_ta?: string;
  bat_buoc?: boolean;
  thu_tu?: number;
  created_at?: string;
  updated_at?: string;
}
export interface IQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'ascend' | 'descend';
  filters?: Record<string, any>;
}
export interface IPaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
} 