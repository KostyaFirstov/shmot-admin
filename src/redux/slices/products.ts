import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'
import { LoadingProperty } from './auth'

export const fetchProducts = createAsyncThunk(
	'auth/fetchProducts',
	async () => {
		const { data } = await axios.get<ProductParams[]>(`/api/products?sort=new`)
		return data
	}
)

export type FetchProductsParams = {
	gender: string
	categoryValue: string
	brandValue: string
	sort: string
}

export type FetchProductsSearchParams = {
	searchValue: string
}

export type ProductParams = {
	_id: number
	title: string
	desc: string
	img: string[]
	categories: string[]
	sizes: number[]
	color: string
	brand: string
	gender: string
	price: number
	amount: number
	status: string
}

interface IProductsSliceState {
	items: ProductParams[]
	status: LoadingProperty
}

const initialState: IProductsSliceState = {
	items: [],
	status: LoadingProperty.STATUS_LOADING
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// PRODUCTS

		builder.addCase(fetchProducts.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.items = []
		})
		builder.addCase(
			fetchProducts.fulfilled,
			(state, action: PayloadAction<ProductParams[]>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.items = action.payload
			}
		)
		builder.addCase(fetchProducts.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.items = []
		})
	}
})

export const selectProducts = (state: RootState) => state.products

export const productsReducer = productsSlice.reducer

export default productsSlice.reducer
