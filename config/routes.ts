export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todolist',
		name: 'ToDoList',
		component: './ToDoList',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/ramdomnumber',
		name: 'RandomNumber',
		component: './RandomNumber',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/quanlyhoctap',
		name: 'QuanLyHocTap',
		component: './QuanLyHocTap',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/quanlymonhoc',
		name: 'QuanLyMonHoc',
		component: './QuanLyMonHoc',
		icon: 'ArrowsAltOutlined',
	},

	{
		name: 'QuanLySoVanBang',
		path: '/quan-ly-so-van-bang',
		icon: 'BookOutlined',
		component: './QuanLySoVanBang',
	},

	{
		path: '/thong-tin-van-bang',
		name: 'ThongTinVanBang',
		component: './ThongTinVanBang',
		icon: 'ArrowsAltOutlined',
	},

	{
		path: '/van-bang/tra-cuu',
		name: 'TraCuuVanBang',
		component: './TraCuuVanBang',
		icon: 'SearchOutlined',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
	{ path: '/', component: 'index', name: 'Trang chủ' },
	{ path: '/appointments', component: 'appointments/index', name: 'Quản lý lịch hẹn' },
	{ path: '/appointments/book', component: 'appointments/book', name: 'Đặt lịch hẹn' },
];
