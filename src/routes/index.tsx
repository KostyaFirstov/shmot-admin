import Main from '../pages/Main'
import Analytics from '../pages/Analytics'
import Sales from '../pages/Sales'
import Users from '../pages/Users'
import Products from '../pages/Products'
import Reviews from '../pages/Reviews'
import Drops from '../pages/Drops'
import Orders from '../pages/Orders'
import ProductPage from '../pages/ProductPage'
import CreateProduct from '../pages/CreateProduct'
import Categories from '../pages/Categories'
import Brands from '../pages/Brands'
import OrderPage from '../pages/OrderPage'
import CreateReview from '../pages/CreateReview'
import CreateUser from '../pages/CreateUser'
import CreateDrop from '../pages/CreateDrop'
import CreateCategory from '../pages/CreateCategory'
import CreateBrand from '../pages/CreateBrand'
import Requests from '../pages/Requests'
import CreateRequest from '../pages/CreateRequest'
import Login from '../pages/Login'
import Account from '../pages/Account'
import UpdateOrder from '../pages/UdateOrder'

export const routes = [
	{ link: '/admin', element: <Main /> },
	{ link: '/admin/account', element: <Account /> },
	{ link: '/admin/analytics', element: <Analytics /> },
	{ link: '/admin/sales', element: <Sales /> },
	{ link: '/admin/users', element: <Users /> },
	{ link: '/admin/products', element: <Products /> },
	{ link: '/admin/orders', element: <Orders /> },
	{ link: '/admin/reviews', element: <Reviews /> },
	{ link: '/admin/drops', element: <Drops /> },
	{ link: '/admin/categories', element: <Categories /> },
	{ link: '/admin/brands', element: <Brands /> },
	{ link: '/admin/requests', element: <Requests /> },
	{ link: '/admin/product/:title', element: <ProductPage /> },
	{ link: '/admin/orders/:id', element: <OrderPage /> },
	{ link: '/admin/product-add/', element: <CreateProduct /> },
	{ link: '/admin/product-add/:title/edit', element: <CreateProduct /> },
	{ link: '/admin/review-add/', element: <CreateReview /> },
	{ link: '/admin/review-add/:title/edit', element: <CreateReview /> },
	{ link: '/admin/user-add/', element: <CreateUser /> },
	{ link: '/admin/user-add/:id/edit', element: <CreateUser /> },
	{ link: '/admin/drop-add/', element: <CreateDrop /> },
	{ link: '/admin/drop-add/:title/edit', element: <CreateDrop /> },
	{ link: '/admin/category-add/', element: <CreateCategory /> },
	{ link: '/admin/category-add/:title/edit', element: <CreateCategory /> },
	{ link: '/admin/brand-add/', element: <CreateBrand /> },
	{ link: '/admin/brand-add/:title/edit', element: <CreateBrand /> },
	{ link: '/admin/request-add/', element: <CreateRequest /> },
	{ link: '/admin/request-add/:id/edit', element: <CreateRequest /> },
	{ link: '/admin/orders/:id/edit', element: <UpdateOrder /> }
]
