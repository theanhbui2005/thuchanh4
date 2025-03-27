import { request } from 'umi';
import {
  IBieuMauCauHinh,
  IQueryParams,
  IPaginationResponse
} from '../../pages/QuanLySoVanBang/types';
import { ip3 } from '@/utils/ip';

// API cho cấu hình biểu mẫu phụ lục văn bằng
const bieuMauUrl = `${ip3}/slink/bieu-mau-cau-hinh`;

// Lấy danh sách cấu hình biểu mẫu
export async function getDanhSachBieuMau(params: IQueryParams): Promise<IPaginationResponse<IBieuMauCauHinh>> {
  return request(`${bieuMauUrl}`, {
    method: 'GET',
    params
  });
}

// Thêm mới cấu hình biểu mẫu
export async function themBieuMau(data: Omit<IBieuMauCauHinh, 'id'>): Promise<IBieuMauCauHinh> {
  return request(`${bieuMauUrl}`, {
    method: 'POST',
    data
  });
}

// Cập nhật cấu hình biểu mẫu
export async function capNhatBieuMau(id: string, data: Partial<IBieuMauCauHinh>): Promise<IBieuMauCauHinh> {
  return request(`${bieuMauUrl}/${id}`, {
    method: 'PUT',
    data
  });
}

// Xóa cấu hình biểu mẫu
export async function xoaBieuMau(id: string): Promise<void> {
  return request(`${bieuMauUrl}/${id}`, {
    method: 'DELETE'
  });
}