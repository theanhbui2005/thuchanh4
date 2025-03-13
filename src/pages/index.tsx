// src/pages/index.tsx
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Trang chủ</h1>
      <p>Chào mừng đến với ứng dụng quản lý lịch hẹn!</p>
      <a href="/appointments">Xem danh sách lịch hẹn</a><br />
      <a href="/appointments/book">Đặt lịch hẹn</a>
    </div>
  );
};

export default HomePage;