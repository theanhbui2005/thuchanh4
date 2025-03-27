import type { IColumn } from '@/components/Table/typing';
import { Button, Modal, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormToDoList from './Form';


const ToDoList = () => {
	const { data, getDataUser, setRow, isEdit, setVisible, setIsEdit, visible } = useModel('randomuser');

	// useEffect(() => {
	// 	getDataUser();
	// }, []);

	const columns: IColumn<RandomUser.Record>[] = [
		{
			title: 'ToDo',
			dataIndex: 'address',
			key: 'name',
			width: 200,
		},
		{
			title: 'time',
			dataIndex: 'balance',
			key: 'age',
			width: 100,
		},
		{
			title: 'state',
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
							Edit
						</Button>
						<Button
							style={{ marginLeft: 10 }}
							onClick={() => {
								const dataLocal: any = JSON.parse(localStorage.getItem('data') as any);
								const newData = dataLocal.filter((item: any) => item.address !== record.address);
								localStorage.setItem('data', JSON.stringify(newData));
								getDataUser();
							}}
							type='primary'
						>
							Delete
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
				Add Job
			</Button>

			<Table dataSource={data} columns={columns} />

			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Edit User' : 'Add User'}
				visible={visible}
				onOk={() => {}}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<FormToDoList />
			</Modal>
		</div>
	);
};

export default ToDoList;
