import {
	createSlice,
	nanoid,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';

import { client } from '../../api/client';

const projectsAdapter = createEntityAdapter({});

const initialState = projectsAdapter.getInitialState({
	status: 'idle',
	error: null,
});

const fakeApi = 'https://jsonplaceholder.typicode.com/todos/';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
	console.log('fetchProjects started');
	const response = await client.get(fakeApi);
	console.log('fetchProjects finished');
	console.log(response);
	return response;
});

export const addNewProject = createAsyncThunk(
	'projects/addNewProject',
	async (initialProject) => {
		const response = await client.post(fakeApi, { project: initialProject });
		return response.project;
	}
);

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		projectAdded: {
			reducer(state, action) {
				state.projects.entities.push(action.payload);
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
		projectUpdated(state, action) {
			const { id, title, content } = action.payload;
			const _project = state.entities[id];
			if (_project) {
				_project.title = title;
				_project.content = content;
			}
		},
	},
	extraReducers: {
		[fetchProjects.pending]: (state, aciton) => {
			state.status = 'loading';
		},
		[fetchProjects.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			projectsAdapter.updateMany(state, action.payload);
		},
		[fetchProjects.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		[addNewProject.fulfilled]: projectsAdapter.addOne,
	},
});

export const { projectAdded, projectUpdated } = projectsSlice.actions;

export default projectsSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
	selectAll: selectAllProjects,
	selectById: selectProjectById,
	selectIds: selectProjectIds,
	// Pass in a selector that returns the posts slice of state
} = projectsAdapter.getSelectors((state) => state.projects);
