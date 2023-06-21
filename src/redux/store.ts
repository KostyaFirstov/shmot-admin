import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import theme from './slices/theme'
import products from './slices/products'

export const store = configureStore({
	reducer: {
		theme,
		products
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
