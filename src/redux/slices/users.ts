import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'
import { LoadingProperty } from './auth'

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
	const { data } = await axios.get<AccountData[]>(`/api/users`)
	return data
})

export type AccountData = {
	id: number
	username: string
	email: string
	orders: number
	reviews: string
	promocodes: number
	createdAt: string
	avatar: string
}

interface IUserSliceState {
	users: AccountData[]
	status: LoadingProperty
}

const initialState: IUserSliceState = {
	users: [],
	status: LoadingProperty.STATUS_LOADING
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// users

		builder.addCase(fetchUsers.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.users = []
		})
		builder.addCase(
			fetchUsers.fulfilled,
			(state, action: PayloadAction<AccountData[]>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.users = action.payload
			}
		)
		builder.addCase(fetchUsers.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.users = []
		})
	}
})

export const selectUsers = (state: RootState) => state.users

export const usersReducer = usersSlice.reducer
export default usersSlice.reducer
