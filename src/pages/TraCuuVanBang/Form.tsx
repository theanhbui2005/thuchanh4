import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';

interface TraCuuVanBangForm {
	soHieuVanBang?: string;
	soVaoSo?: string;
	msv?: string;
	hoTen?: string;
	ngaySinh?: string;
}

interface FormProps {
	onSearch: (values: TraCuuVanBangForm) => void;
	loading: boolean;
}

const FormTraCuuVanBang: React.FC<FormProps> = ({ onSearch, loading }) => {
	const [form] = Form.useForm();

	const handleFinish = (values: TraCuuVanBangForm) => {
		const filledFields = Object.values(values).filter((value) => value);
		if (filledFields.length < 2) {
			message.error('Vui lòng nhập ít nhất 2 tham số để tra cứu!');
			return;
		}
		onSearch(values);
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleFinish} style={{ maxWidth: 600, margin: '0 auto' }}>
			<Form.Item name='soHieuVanBang' label='Số hiệu văn bằng'>
				<Input placeholder='Nhập số hiệu văn bằng' />
			</Form.Item>

			<Form.Item name='soVaoSo' label='Số vào sổ'>
				<Input placeholder='Nhập số vào sổ' />
			</Form.Item>

			<Form.Item name='msv' label='Mã sinh viên (MSV)'>
				<Input placeholder='Nhập mã sinh viên' />
			</Form.Item>

			<Form.Item name='hoTen' label='Họ tên'>
				<Input placeholder='Nhập họ tên' />
			</Form.Item>

			<Form.Item name='ngaySinh' label='Ngày sinh'>
				<Input placeholder='Nhập ngày sinh (YYYY-MM-DD)' />
			</Form.Item>

			<Row justify='center'>
				<Col>
					<Button type='primary' htmlType='submit' loading={loading}>
						Tìm kiếm
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default FormTraCuuVanBang;
