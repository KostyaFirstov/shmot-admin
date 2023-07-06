import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'
import products from './slices/products'
import users from './slices/users'
import orders from './slices/orders'
import reviews from './slices/reviews'
import drops from './slices/drops'
import filters from './slices/filters'
import requests from './slices/requests'
import auth from './slices/auth'

const persistConfig = {
	key: 'root',
	version: 1,
	storage
}

const persistedReducer = persistReducer(persistConfig, auth)

export const store = configureStore({
	reducer: {
		products,
		users,
		orders,
		reviews,
		drops,
		filters,
		requests,
		persistedReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
