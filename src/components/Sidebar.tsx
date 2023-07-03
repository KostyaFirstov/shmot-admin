import React from 'react'
import Logo from './Logo'
import SidebarColumn from './SidebarColumn'
import ThemeSwitcher from './ThemeSwitcher'

const Sidebar = () => {
	const statisticLinks = [
		{ name: 'Главная', url: '/admin' },
		{ name: 'Аналитика', url: '/admin/analytics/' },
		{ name: 'Скидки', url: '/admin/sales/' }
	]
	const managementLinks = [
		{ name: 'Пользователи', url: '/admin/users/' },
		{ name: 'Продукты', url: '/admin/products/' },
		{ name: 'Заказы', url: '/admin/orders/' },
		{ name: 'Обзоры', url: '/admin/reviews/' },
		{ name: 'Дропы', url: '/admin/drops/' },
		{ name: 'Категории', url: '/admin/categories/' },
		{ name: 'Бренды', url: '/admin/brands/' }
	]
	const feedbackLinks = [
		{ name: 'Сообщения', url: '/messages' },
		{ name: 'Администрирование', url: '/admin/email' }
	]

	return (
		<div className='sidebar'>
			<Logo />
			<div className='sidebar__columns'>
				<SidebarColumn title='Статистика' links={statisticLinks} />
				<SidebarColumn title='Управление' links={managementLinks} />
				<SidebarColumn title='Обратная связь' links={feedbackLinks} />
			</div>
			<div className='sidebar__options'>
				<div className='sidebar__option sidebar__option-theme'>
					<ThemeSwitcher />
				</div>
				<div className='sidebar__option sidebar__option-account'>
					<div className='account__avatar'>
						<img src='/img/Oval.jpg' alt='' />
					</div>
					<div className='account__info'>
						<div className='account__name'>
							<span>Frankie Sullivan</span>
						</div>
						<div className='account__code'>
							<span>@frankie</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
