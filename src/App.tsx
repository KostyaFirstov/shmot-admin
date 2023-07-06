import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { ScrollToTop } from './utils/ScrollToTop'
import { routes } from './routes'
import Login from './pages/Login'

function App() {
	return (
		<div className='App'>
			<ScrollToTop />
			<Routes>
				<Route path='/admin/login' element={<Login />} />
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
