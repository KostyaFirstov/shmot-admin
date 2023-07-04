import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { ScrollToTop } from './utils/ScrollToTop'
import { useSelector } from 'react-redux'
import { selectThemeValue } from './redux/slices/theme'
import { routes } from './routes'

function App() {
	const theme = useSelector(selectThemeValue)

	return (
		<div className={`App ${theme}`}>
			<ScrollToTop />
			<Routes>
				<Route path='/admin' element={<MainLayout />}>
					{routes.map((route, index) => {
						return (
							<Route key={index} path={route.link} element={route.element} />
						)
					})}
				</Route>
			</Routes>
		</div>
	)
}

export default App
