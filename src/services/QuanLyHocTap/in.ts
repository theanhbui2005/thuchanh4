export const getData = async (data: any) => {
    localStorage.setItem('subject', JSON.stringify(data));
    console.log('Dữ liệu đã lưu vào localStorage:', data);
};
