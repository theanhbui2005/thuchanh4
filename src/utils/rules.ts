// Các luật validation cho form
const rules = {
  required: [
    {
      required: true,
      message: 'Trường này không được để trống',
    },
  ],
  email: [
    {
      type: 'email',
      message: 'Email không đúng định dạng',
    },
  ],
  phone: [
    {
      pattern: /^(0|\+84)[1-9]\d{8,9}$/,
      message: 'Số điện thoại không đúng định dạng',
    },
  ],
  number: [
    {
      pattern: /^[0-9]+$/,
      message: 'Chỉ được nhập số',
    },
  ],
};

export default rules; 