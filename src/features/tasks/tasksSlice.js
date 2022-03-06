import {
	createSlice,
	nanoid,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';

const axios = require('axios').default;

const tasksAdapter = createEntityAdapter({
	// selectId: (task) => task.taskId,
});

const initialState = tasksAdapter.getInitialState({
	status: 'idle',
	error: null,
});

const myApi = 'http://127.0.0.1:8000/api/v1/tasks';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	const response = await axios.get(myApi);
	return response.data.data.tasks;
});

export const addNewTask = createAsyncThunk(
	'tasks/addNewTask',
	async (initialTask) => {
		const response = await axios.post(`${myApi}`, initialTask);
		return response.data.data.task;
	}
);

export const taskUpdated = createAsyncThunk(
	'tasks/taskUpdated',
	async (initialTask) => {
		const response = await axios.patch(
			`${myApi}/${initialTask.id}`,
			initialTask
		);
		return response.data.data.task;
	}
);

export const taskDeleted = createAsyncThunk('tasks/taskDeleted', async (id) => {
	const response = await axios.delete(`${myApi}/${id}`);
	console.log('taskDeleted');
	console.log(response);
	return id;
});

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		taskAdded: {
			reducer(state, action) {
				state.tasks.entities.push(action.payload);
				// tasksAdapter.addOne;
			},
			prepare(title, content) {
				return {
					payload: {
						id: nanoid(),
						date: new Date().toISOString(),
						title,
						content,
					},
				};
			},
		},
	},
	extraReducers: {
		[fetchTasks.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchTasks.fulfilled]: (state, action) => {
			state.status = 'succeeded';

			tasksAdapter.upsertMany(state, action.payload);
		},
		[fetchTasks.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		// Use the `addOne` reducer for the fulfilled case
		[addNewTask.fulfilled]: tasksAdapter.addOne,
		[taskUpdated.pending]: (state, action) => {
			state.status = 'loading';
		},
		[taskUpdated.rejected]: (state, action) => {
			state.status = 'fail';
			state.error = action.error.message;
		},
		[taskUpdated.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			tasksAdapter.upsertOne(state, action.payload);
		},
		[taskDeleted.pending]: (state, action) => {
			state.status = 'loading';
		},
		[taskDeleted.rejected]: (state, action) => {
			state.status = 'fail';
			state.error = action.error.message;
		},
		[taskDeleted.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			tasksAdapter.removeOne(state, action.payload);
		},
	},
});

export const { taskAdded } = tasksSlice.actions;

export default tasksSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
	selectAll: selectAllTasks,
	selectById: selectTaskById,
	selectIds: selectTasksIds,
	// Pass in a selector that returns the posts slice of state
} = tasksAdapter.getSelectors((state) => state.tasks);
