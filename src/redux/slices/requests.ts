import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'
import { LoadingProperty } from './auth'

export const fetchRequests = createAsyncThunk(
	'auth/fetchRequests',
	async () => {
		const { data } = await axios.get<RequestState[]>('/api/requests?all=true')
		return data
	}
)

export const fetchRemoveRequests = createAsyncThunk(
	'auth/fetchRemoveRequests',
	async (id: number) => {
		const { data } = await axios.delete<RequestState[]>(`/api/requests/${id}`)
		return data
	}
)

export type RequestState = {
	_id: number
	text: string
	popular: number
	isApproved: boolean
}

interface IrequestsSliceState {
	requests: RequestState[]
	status: LoadingProperty
}

const initialState: IrequestsSliceState = {
	requests: [],
	status: LoadingProperty.STATUS_LOADING
}

export const requestSlice = createSlice({
	name: 'requests',
	initialState,
	reducers: {
		removeRequest: (state, action: PayloadAction<number>) => {
			state.requests = state.requests.filter(
				elem => elem._id !== action.payload
			)
		}
	},
	extraReducers: builder => {
		// requests

		builder.addCase(fetchRequests.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.requests = []
		})
		builder.addCase(
			fetchRequests.fulfilled,
			(state, action: PayloadAction<RequestState[]>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.requests = action.payload
			}
		)
		builder.addCase(fetchRequests.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.requests = []
		})
	}
})

export const selectRequest = (state: RootState) => state.requests

export const requestsReducer = requestSlice.reducer

export const { removeRequest } = requestSlice.actions
export default requestSlice.reducer
