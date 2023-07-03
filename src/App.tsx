import React from 'react'
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
import CreateProduct from './pages/CreateProduct'
import Categories from './pages/Categories'
import Brands from './pages/Brands'
import OrderPage from './pages/OrderPage'
import CreateReview from './pages/CreateReview'
import CreateUser from './pages/CreateUser'

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
					<Route path='/admin/categories' element={<Categories />} />
					<Route path='/admin/brands' element={<Brands />} />
					<Route path='/admin/product/:title' element={<ProductPage />} />
					<Route path='/admin/orders/:id' element={<OrderPage />} />
					<Route path='/admin/product-add/' element={<CreateProduct />} />
					<Route
						path='/admin/product-add/:title/edit'
						element={<CreateProduct />}
					/>
					<Route path='/admin/review-add/' element={<CreateReview />} />
					<Route
						path='/admin/review-add/:title/edit'
						element={<CreateReview />}
					/>
					<Route path='/admin/user-add/' element={<CreateUser />} />
					<Route path='/admin/user-add/:id/edit' element={<CreateUser />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
