import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'
import { LoadingProperty } from './auth'

export const fetchBrands = createAsyncThunk('auth/fetchBrands', async () => {
	const { data } = await axios.get<FiltersParams[]>('/api/brands')
	return data
})

export const fetchCategories = createAsyncThunk(
	'auth/fetchCategories',
	async () => {
		const { data } = await axios.get<FiltersParams[]>('/api/categories')
		return data
	}
)

export const fetchRemoveBrand = createAsyncThunk(
	'auth/fetchRemoveBrand',
	async (id: number) => {
		const { data } = await axios.delete<FiltersParams[]>(`/api/brands/${id}`)
		return data
	}
)

export const fetchRemoveCategory = createAsyncThunk(
	'auth/fetchRemoveCategory',
	async (id: number) => {
		const { data } = await axios.delete<FiltersParams[]>(
			`/api/categories/${id}`
		)
		return data
	}
)

export type FiltersParams = {
	_id: number
	name: string
	link: string
}

interface IFiltersSliceState {
	brands: FiltersParams[]
	categories: FiltersParams[]
	status: LoadingProperty
}

const initialState: IFiltersSliceState = {
	brands: [],
	categories: [],
	status: LoadingProperty.STATUS_LOADING
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		removeBrand: (state, action: PayloadAction<number>) => {
			state.brands = state.brands.filter(elem => elem._id !== action.payload)
		},
		removeCategory: (state, action: PayloadAction<number>) => {
			state.categories = state.categories.filter(
				elem => elem._id !== action.payload
			)
		}
	},
	extraReducers: builder => {
		// BRANDS

		builder.addCase(fetchBrands.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.brands = []
		})
		builder.addCase(
			fetchBrands.fulfilled,
			(state, action: PayloadAction<FiltersParams[]>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.brands = action.payload
			}
		)
		builder.addCase(fetchBrands.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.brands = []
		})

		// CATEGORIES

		builder.addCase(fetchCategories.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.categories = []
		})
		builder.addCase(
			fetchCategories.fulfilled,
			(state, action: PayloadAction<FiltersParams[]>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.categories = action.payload
			}
		)
		builder.addCase(fetchCategories.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.categories = []
		})
	}
})

export const selectFilters = (state: RootState) => state.filters

export const { removeBrand, removeCategory } = filtersSlice.actions

export const filterReducer = filtersSlice.reducer
export default filtersSlice.reducer
