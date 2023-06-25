import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'
import { LoadingProperty } from './auth'

export const fetchDrops = createAsyncThunk('auth/fetchDrops', async () => {
	const { data } = await axios.get<DropParams[]>(`/api/drops?sort=new`)
	return data
})

export type DropParams = {
	_id: number
	title: string
	desc: string
	text: string
	img: string[]
	date: string
	viewsCount: number
}

interface IDropsSliceState {
	drops: DropParams[]
	status: LoadingProperty
}

const initialState: IDropsSliceState = {
	drops: [],
	status: LoadingProperty.STATUS_LOADING
}

export const dropsSlice = createSlice({
	name: 'drops',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// drops

		builder.addCase(fetchDrops.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.drops = []
		})
		builder.addCase(
			fetchDrops.fulfilled,
			(state, action: PayloadAction<DropParams[]>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.drops = action.payload
			}
		)
		builder.addCase(fetchDrops.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.drops = []
		})
	}
})

export const selectDrops = (state: RootState) => state.drops

export const dropsReducer = dropsSlice.reducer

export default dropsSlice.reducer
