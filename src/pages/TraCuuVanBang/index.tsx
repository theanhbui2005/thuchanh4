import React, { useState } from 'react';
import { message } from 'antd';
import FormTraCuuVanBang from './Form';

const TraCuuVanBang: React.FC = () => {
	const [loading, setLoading] = useState(false);

	const handleSearch = async (values: any) => {
		setLoading(true);
		try {
			// Gửi dữ liệu tìm kiếm đến backend (API giả lập)
			console.log('Dữ liệu tìm kiếm:', values);
			message.success('Tra cứu thành công!');
		} catch (error) {
			console.error('Lỗi tra cứu:', error);
			message.error('Đã xảy ra lỗi khi tra cứu!');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ padding: '20px' }}>
			<h2>Tra cứu văn bằng</h2>
			<FormTraCuuVanBang onSearch={handleSearch} loading={loading} />
		</div>
	);
};

export default TraCuuVanBang;
