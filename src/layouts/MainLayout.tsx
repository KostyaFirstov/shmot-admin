import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../redux/slices/auth'

const MainLayout = () => {
	const isAuth = useSelector(selectIsAuth)
	const isAdmin = JSON.parse(
		JSON.parse(localStorage.getItem('persist:root') || '')?.data
	)?.isAdmin

	if (!isAuth) {
		return <Navigate to='/admin/login' />
	}

	if (isAuth && isAdmin === false) {
		return <Navigate to='/' />
	}

	return (
		<div className='wrapper-main'>
			<Sidebar />
			<Outlet />
		</div>
	)
}

export default MainLayout
