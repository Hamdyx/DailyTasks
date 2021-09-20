import {
	createSlice,
	nanoid,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

const tasksAdapter = createEntityAdapter({
	// selectId: (task) => task.taskId,
});

const initialState = tasksAdapter.getInitialState({
	status: 'idle',
	error: null,
});

const fakeApi = 'https://jsonplaceholder.typicode.com/todos/';
const myApi = 'http://127.0.0.1:8000/api/v1/tasks';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	const response = await client.get(myApi);
	return response.data.tasks;
});

/* export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	console.log('fetchTasks Init');
	const response = await client.get(fakeApi);
	console.log('fetchTasks done');
	console.log(response);
	return response;
}); */

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (initialTask) => {
	console.log('addNewTask started');
	const response = await client.post(myApi, initialTask);
	console.log('addNewTask done');

	return response.data.task;
});

/* export const addNewTask = createAsyncThunk('tasks/addNewTask', async (initialTask) => {
	// const response = { task: initialTask };
	const response = await client.post(fakeApi, { task: initialTask });

	return response.task;
}); */

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
		taskUpdated(state, action) {
			const { id, title, details, additionalNotes, isCompleted, progress } =
				action.payload;
			const existingTask = state.entities[id];
			if (existingTask) {
				existingTask.title = title;
				existingTask.details = details;
				existingTask.additionalNotes = additionalNotes;
				existingTask.isCompleted = isCompleted;
				existingTask.progress = progress;
			}
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
	},
});

export const { taskAdded, taskUpdated } = tasksSlice.actions;

export default tasksSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
	selectAll: selectAllTasks,
	selectById: selectTaskById,
	selectIds: selectTasksIds,
	// Pass in a selector that returns the posts slice of state
} = tasksAdapter.getSelectors((state) => state.tasks);
