import { Effect, Reducer } from 'umi';

export interface TraCuuVanBangState {
	data: any[];
	loading: boolean;
}

export interface TraCuuVanBangModelType {
	namespace: 'tracuuvanbang';
	state: TraCuuVanBangState;
	effects: {
		fetchData: Effect;
	};
	reducers: {
		saveData: Reducer<TraCuuVanBangState>;
	};
}

const TraCuuVanBangModel: TraCuuVanBangModelType = {
	namespace: 'tracuuvanbang',

	state: {
		data: [],
		loading: false,
	},

	effects: {
		*fetchData({ payload }, { call, put }) {
			try {
				// API giả lập
				const response = yield call(() => Promise.resolve([]));
				yield put({ type: 'saveData', payload: response });
			} catch (error) {
				console.error('Lỗi khi fetch dữ liệu:', error);
			}
		},
	},

	reducers: {
		saveData(state, { payload }) {
			return {
				...state,
				data: payload,
			};
		},
	},
};

export default TraCuuVanBangModel;
