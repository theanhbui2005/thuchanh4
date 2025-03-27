import { useState } from 'react';
import { useModel } from 'umi';

export default () => {
    const [subject, setData] = useState([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<QuanLyHocTap.Record>();

    const getDataUser = async () => {
        const dataLocal: any = JSON.parse(localStorage.getItem('subject') as any);
        if (!dataLocal?.length) {
        	// const res = await getData();
        	// localStorage.setItem('data', JSON.stringify(res?.data ?? []));
        	setData(dataLocal);
        	return;
        }
        setData(dataLocal);
    };
    // const getDataUser = async (newData: any) => {
    //     localStorage.setItem('subject', JSON.stringify(subject));
    //     setData(subject); // Cập nhật state nếu cần
        
    // };
    

    return {
        subject,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        setData,
        getDataUser,
    };
};
