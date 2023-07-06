import React from 'react'
import Logo from './Logo'
import SidebarColumn from './SidebarColumn'
import { selectAccount } from '../redux/slices/auth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = () => {
	const account = useSelector(selectAccount)

	const statisticLinks = [
		{ name: 'Главная', url: '/admin' },
		{ name: 'Аналитика', url: '/admin/analytics/' }
		// { name: 'Скидки', url: '/admin/sales/' }
	]
	const managementLinks = [
		{ name: 'Пользователи', url: '/admin/users/' },
		{ name: 'Продукты', url: '/admin/products/' },
		{ name: 'Заказы', url: '/admin/orders/' },
		{ name: 'Обзоры', url: '/admin/reviews/' },
		{ name: 'Дропы', url: '/admin/drops/' },
		{ name: 'Категории', url: '/admin/categories/' },
		{ name: 'Бренды', url: '/admin/brands/' },
		{ name: 'Запросы', url: '/admin/requests/' }
	]
	// const feedbackLinks = [
	// 	{ name: 'Сообщения', url: '/messages' },
	// 	{ name: 'Администрирование', url: '/admin/email' }
	// ]

	return (
		<div className='sidebar'>
			<Logo />
			<div className='sidebar__columns'>
				<SidebarColumn title='Статистика' links={statisticLinks} />
				<SidebarColumn title='Управление' links={managementLinks} />
			</div>
			<div className='sidebar__options'>
				<Link
					to='/admin/account'
					className='sidebar__option sidebar__option-account'
				>
					<div className='option-account__avatar'>
						<img src={`http://localhost:5000${account?.avatar}`} alt='' />
					</div>
					<div className='option-account__info'>
						<div className='option-account__name'>
							<span>{account?.username}</span>
						</div>
						<div className='option-account__code'>
							<span>{account?.email}</span>
						</div>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Sidebar
