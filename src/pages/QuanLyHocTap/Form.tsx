/* eslint-disable react/self-closing-comp */

import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';

const FormQuanLyHocTap = () => {
	const { subject, getDataUser, row, isEdit, setVisible } = useModel('quanlyhoctap');

	return (
		<Form
			onFinish={(values) => {
				console.log(values)
				console.log('🚀 ~ QuanLyHocTap ~ values:', values);
				const index = subject.findIndex((item: any) => item.name === row?.name);
				const dataTemp: QuanLyHocTap.Record[] = [...subject];
				dataTemp.splice(index, 1, values);
				const dataLocal = isEdit ? dataTemp : [values, ...subject];
				localStorage.setItem('subject', JSON.stringify(dataLocal));
				console.log(123)
				setVisible(false);
				getDataUser();
			}}
		>
			<Form.Item
				initialValue={row?.name}
				label='tên môn học'
				name='name'
				rules={[{ required: true, message: 'điền tên môn học!' }]}
			>
				<Input />
			</Form.Item>
            <Form.Item
				initialValue={row?.date}
				label='thời gian học'
				name='date'
				rules={[{ required: true, message: 'điền thời gian học' }]}
			>
                <Input/>
            </Form.Item>
            
			<Form.Item
				initialValue={row?.time}
				label='thời lượng học'
				name='time'
				rules={[{ required: true, message: 'nhập thời lượng học' }]}
			>
				<Input />
			</Form.Item>
            
			<Form.Item
				initialValue={row?.content}
				label='nội dung đã học'
				name='content'
				rules={[{ required: true, message: 'nhập nội dung đã học' }]}
			>
				<Input />
			</Form.Item>
            

			<Form.Item
				initialValue={row?.status}
				label='trạng thái'
				name='status'
				rules={[{ required: true, message: 'nhập trạng thái' }]}
			>
				<Input />
			</Form.Item>

			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Lưu' : 'Thêm'}
				</Button>
				<Button onClick={() => setVisible(false)}>Hủy</Button>
			</div>
		</Form>
	);
};

export default FormQuanLyHocTap;
