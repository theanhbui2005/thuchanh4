
import type { IColumn } from '@/components/Table/typing';
import { Button, Modal, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormQuanLyHocTap from './Form';




const QuanLyHocTap = () => {
	const { subject, getDataUser, setRow, isEdit, setVisible, setIsEdit, visible } = useModel('quanlyhoctap');

	useEffect(() => {
		getDataUser();
		
	}, []);

	const columns: IColumn<QuanLyHocTap.Record>[] = [
		{
			title: 'Tên môn học',
			dataIndex: 'name',
			key: 'name',
			width: 200,
		},
        {
			title: 'Thời gian học',
			dataIndex: 'date',
			key: 'time',
			width: 200,
		},
        {
			title: 'Thời lượng học',
			dataIndex: 'time',
			key: 'time',
			width: 200,
		},

		{
			title: 'Nội dung đã học',
			dataIndex: 'content',
			key: 'age',
			width: 100,
		},
		{
			title: 'trạng thái',
			dataIndex: 'status',
			key: 'age',
			width: 100,
		},

		{
			title: 'chỉnh sửa',
			width: 200,
			align: 'center',
			render: (record) => {
				return (
					<div>
						<Button
							onClick={() => {
								setVisible(true);
								setRow(record);
								setIsEdit(true);
							}}
						>
							Sửa
						</Button>
						<Button
							style={{ marginLeft: 10 }}
							onClick={() => {
								const dataLocal: any = JSON.parse(localStorage.getItem('subject') as any);
								const newData = dataLocal.filter((item: any) => item.name !== record.name);
								localStorage.setItem('subject', JSON.stringify(newData));
								getDataUser();
							}}
							type='primary'
						>
							Xóa
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
				}}
			>
				Thêm môn học
			</Button>

			<Table dataSource={subject} columns={columns} />

			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Sửa môn học' : 'Thêm môn học'}
				visible={visible}
				onOk={() => {}}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<FormQuanLyHocTap />
			</Modal>
		</div>
	);
};

export default QuanLyHocTap;
