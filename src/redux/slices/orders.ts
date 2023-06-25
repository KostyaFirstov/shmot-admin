import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'
import { LoadingProperty } from './auth'
import { OrderState } from '../../pages/Main'

export const fetchOrders = createAsyncThunk('auth/fetchOrders', async () => {
	const { data } = await axios.get<OrderState[]>(`/api/orders`)
	return data
})

export const fetchRemoveOrder = createAsyncThunk(
	'auth/fetchRemoveOrder',
	async (id: number) => {
		const { data } = await axios.delete<OrderState[]>(`/api/orders/${id}`)
		return data
	}
)

interface IOrderliceState {
	orders: OrderState[]
	status: LoadingProperty
}

const initialState: IOrderliceState = {
	orders: [],
	status: LoadingProperty.STATUS_LOADING
}

export const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		removeOrder: (state, action: PayloadAction<number>) => {
			state.orders = state.orders.filter(elem => elem._id !== action.payload)
		}
	},
	extraReducers: builder => {
		// orders

		builder.addCase(fetchOrders.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.orders = []
		})
		builder.addCase(
			fetchOrders.fulfilled,
			(state, action: PayloadAction<OrderState[]>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.orders = action.payload
			}
		)
		builder.addCase(fetchOrders.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.orders = []
		})
	}
})

export const selectOrder = (state: RootState) => state.orders
export const orderReducer = orderSlice.reducer

export const { removeOrder } = orderSlice.actions
export default orderSlice.reducer
