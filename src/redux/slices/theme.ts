import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getThemeFromLS } from '../../utils/getThemeFromLS'

export enum ThemeValues {
	LIGHTMODE = 'lightmode',
	DARKMODE = 'darkmode'
}

const initialState = {
	themeValue: getThemeFromLS()
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.themeValue = action.payload
		}
	}
})

export const selectThemeValue = (state: RootState) => state.theme.themeValue

export const { setTheme } = themeSlice.actions

export const themeReducer = themeSlice.reducer
export default themeSlice.reducer
