import React from 'react'
import Logo from './components/Logo'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Main from './pages/Main'
import Analytics from './pages/Analytics'
import Sales from './pages/Sales'
import Users from './pages/Users'
import Products from './pages/Products'
import Reviews from './pages/Reviews'
import Drops from './pages/Drops'
import Orders from './pages/Orders'
import { ScrollToTop } from './utils/ScrollToTop'
import { useSelector } from 'react-redux'
import { selectThemeValue } from './redux/slices/theme'
import ProductPage from './pages/ProductPage'

function App() {
	const theme = useSelector(selectThemeValue)

	return (
		<div className={`App ${theme}`}>
			<ScrollToTop />
			<Routes>
				<Route path='/admin' element={<MainLayout />}>
					<Route path='/admin' element={<Main />} />
					<Route path='/admin/analytics' element={<Analytics />} />
					<Route path='/admin/sales' element={<Sales />} />
					<Route path='/admin/users' element={<Users />} />
					<Route path='/admin/products' element={<Products />} />
					<Route path='/admin/orders' element={<Orders />} />
					<Route path='/admin/reviews' element={<Reviews />} />
					<Route path='/admin/drops' element={<Drops />} />
					<Route path='/admin/product/:title' element={<ProductPage />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
