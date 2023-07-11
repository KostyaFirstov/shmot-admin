import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'
import { getTokenFromLS } from '../../utils/getTokenFromLS'

export const fetchAuth = createAsyncThunk(
	'auth/fetchAuth',
	async (params: FetchAuthParams) => {
		const { data } = await axios.post<AccountData>('/api/auth/login', params)
		return data
	}
)

export const fetchAuthUpdate = createAsyncThunk(
	'auth/fetchAuthUpdate',
	async (params: any) => {
		const { data } = await axios.put(`/api/users/${params.id}`, params.data)
		return data
	}
)

export type AccountData = {
	_id: number
	avatar: string
	username: string
	email: string
	orders: number
	reviews: string
	promocodes: number
	createdAt: string
	accessToken: string
	isAdmin: boolean
}

type FetchAuthParams = {
	email: string
	password: string
}

export enum LoadingProperty {
	STATUS_LOADING = 'loading',
	STATUS_LOADED = 'loaded',
	STATUS_ERROR = 'error'
}

interface IAuthSliceState {
	data: null | AccountData
	status: LoadingProperty
	error: string
}

const initialState: IAuthSliceState = {
	data: null,
	status: LoadingProperty.STATUS_LOADING,
	error: ''
}

export const token = { value: getTokenFromLS() }

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null
			token.value = ''
		},
		updateAdmin: (state, action) => {
			state.data = action.payload
		}
	},
	extraReducers: builder => {
		// LOGIN

		builder.addCase(fetchAuth.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.data = null
			state.error = ''
			token.value = ''
		})

		builder.addCase(
			fetchAuth.fulfilled,
			(state, action: PayloadAction<AccountData>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.data = action.payload
				state.error = ''
				token.value = action.payload.accessToken
			}
		)

		builder.addCase(fetchAuth.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.data = null
			state.error = 'Неправильный логин или пароль'
			token.value = ''
		})
	}
})

export const selectIsAuth = (state: RootState) =>
	Boolean(state.persistedReducer.data)

export const selectIsAdmin = (state: RootState) =>
	state.persistedReducer.data?.isAdmin
export const selectAccount = (state: RootState) => state.persistedReducer.data
export const selectErrorAuth = (state: RootState) =>
	state.persistedReducer.error

export const authReducer = authSlice.reducer

export const { logout, updateAdmin } = authSlice.actions
export default authSlice.reducer
