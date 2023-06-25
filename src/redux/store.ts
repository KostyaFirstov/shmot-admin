import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import theme from './slices/theme'
import products from './slices/products'
import users from './slices/users'
import orders from './slices/orders'
import reviews from './slices/reviews'
import drops from './slices/drops'
import filters from './slices/filters'

export const store = configureStore({
	reducer: {
		theme,
		products,
		users,
		orders,
		reviews,
		drops,
		filters
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
