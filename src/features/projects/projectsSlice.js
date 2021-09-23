import {
	createSlice,
	nanoid,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';

import { client } from '../../api/client';

const axios = require('axios').default;

const projectsAdapter = createEntityAdapter({});

const initialState = projectsAdapter.getInitialState({
	status: 'idle',
	error: null,
});

const myApi = 'http://127.0.0.1:8000/api/v1/projects';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
	console.log('fetchProjects started');
	const response = await client.get(myApi);
	console.log('fetchProjects finished');
	console.log(response);
	return response.data.projects;
});

export const addNewProject = createAsyncThunk(
	'projects/addNewProject',
	async (project) => {
		const response = await client.post(myApi, project);
		console.log(response);
		return response.data.project;
	}
);

export const projectUpdated = createAsyncThunk(
	'projects/projectUpdated',
	async (project) => {
		const response = await axios.patch(`${myApi}/${project.id}`, project);
		return response.data.data.project;
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
	},
	extraReducers: {
		[fetchProjects.pending]: (state, aciton) => {
			state.status = 'loading';
		},
		[fetchProjects.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			projectsAdapter.upsertMany(state, action.payload);
		},
		[fetchProjects.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		[addNewProject.fulfilled]: projectsAdapter.addOne,
		[projectUpdated.pending]: (state, action) => {
			state.status = 'loading';
		},
		[projectUpdated.rejected]: (state, action) => {
			state.status = 'fail';
			state.error = action.error.message;
		},
		[projectUpdated.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			projectsAdapter.upsertOne(state, action.payload);
		},
	},
});

export const { projectAdded } = projectsSlice.actions;

export default projectsSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
	selectAll: selectAllProjects,
	selectById: selectProjectById,
	selectIds: selectProjectIds,
	// Pass in a selector that returns the posts slice of state
} = projectsAdapter.getSelectors((state) => state.projects);
