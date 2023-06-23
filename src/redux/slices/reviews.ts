import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios'
import { RootState } from '../store'
import { LoadingProperty } from './auth'
import { OrderState } from '../../pages/Main'
import { ReviewState } from '../../pages/Analytics'

export const fetchReviews = createAsyncThunk('auth/fetchReviews', async () => {
	const { data } = await axios.get<ReviewState[]>(`/api/reviews`)
	return data
})

interface IReviewsSliceState {
	reviews: ReviewState[]
	status: LoadingProperty
}

const initialState: IReviewsSliceState = {
	reviews: [],
	status: LoadingProperty.STATUS_LOADING
}

export const reviewslice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// reviews

		builder.addCase(fetchReviews.pending, state => {
			state.status = LoadingProperty.STATUS_LOADING
			state.reviews = []
		})
		builder.addCase(
			fetchReviews.fulfilled,
			(state, action: PayloadAction<ReviewState[]>) => {
				state.status = LoadingProperty.STATUS_LOADED
				state.reviews = action.payload
			}
		)
		builder.addCase(fetchReviews.rejected, state => {
			state.status = LoadingProperty.STATUS_ERROR
			state.reviews = []
		})
	}
})

export const selectReviews = (state: RootState) => state.reviews

export const ReviewsReducer = reviewslice.reducer
export default reviewslice.reducer
