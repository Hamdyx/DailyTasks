import {
	createSlice,
	nanoid,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
	status: 'ide',
	error: null,
});

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		taskAdded: {},
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
