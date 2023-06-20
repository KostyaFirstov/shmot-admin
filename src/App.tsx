import React from 'react'
import Logo from './components/Logo'
import { Link } from 'react-router-dom'

function App() {
	const [theme, setTheme] = React.useState('white')

	return (
		<div className={`App ${theme}`}>
			<div className='sidebar bg-white dark:bg-black'>
				<Logo />
				<div className='sidebar__column'>
					<div className='sidebar__title'>
						<span>Статистика</span>
					</div>
					<ul className='sidebar__links'>
						<li className='sidebar__link'>
							<Link to='/'>Главная</Link>
						</li>
						<li className='sidebar__link'>
							<Link to='/'>Аналитика</Link>
						</li>
						<li className='sidebar__link'>
							<Link to='/'>Скидки</Link>
						</li>
					</ul>
				</div>
				<div className='sidebar__column'>
					<div className='sidebar__title'>
						<span>Управление</span>
					</div>
					<ul className='sidebar__links'>
						<li className='sidebar__link'>
							<Link to='/'>Пользователи</Link>
						</li>
						<li className='sidebar__link'>
							<Link to='/'>Продукты</Link>
						</li>
						<li className='sidebar__link'>
							<Link to='/'>Заказы</Link>
						</li>
					</ul>
				</div>
				<div className='sidebar__column'>
					<div className='sidebar__title'>
						<span>Обратная связь</span>
					</div>
					<ul className='sidebar__links'>
						<li className='sidebar__link'>
							<Link to='/'>Сообщения</Link>
						</li>
						<li className='sidebar__link'>
							<Link to='/'>Почта</Link>
						</li>
						<li className='sidebar__link'>
							<Link to='/'>Жалобы</Link>
						</li>
					</ul>
				</div>
				<div className='options'>
					<div className='options__item options__notification'>
						<svg
							width='20'
							height='21'
							viewBox='0 0 20 21'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M11.9998 20H7.99977M15.9998 7C15.9998 5.4087 15.3676 3.88258 14.2424 2.75736C13.1172 1.63214 11.5911 1 9.99977 1C8.40848 1 6.88235 1.63214 5.75713 2.75736C4.63192 3.88258 3.99977 5.4087 3.99977 7C3.99977 10.0902 3.22024 12.206 2.34944 13.6054C1.6149 14.7859 1.24763 15.3761 1.2611 15.5408C1.27601 15.7231 1.31463 15.7926 1.46155 15.9016C1.59423 16 2.19237 16 3.38863 16H16.6109C17.8072 16 18.4053 16 18.538 15.9016C18.6849 15.7926 18.7235 15.7231 18.7384 15.5408C18.7519 15.3761 18.3846 14.7859 17.6501 13.6054C16.7793 12.206 15.9998 10.0902 15.9998 7Z'
								stroke='#2A2A2A'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
						Уведомления
					</div>
					<div className='options__item options__settings'>
						<svg
							width='20'
							height='20'
							viewBox='0 0 20 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M13.0505 7H3.5C2.11929 7 1 5.88071 1 4.5C1 3.11929 2.11929 2 3.5 2H13.0505M6.94949 18H16.5C17.8807 18 19 16.8807 19 15.5C19 14.1193 17.8807 13 16.5 13H6.94949M1 15.5C1 17.433 2.567 19 4.5 19C6.433 19 8 17.433 8 15.5C8 13.567 6.433 12 4.5 12C2.567 12 1 13.567 1 15.5ZM19 4.5C19 6.433 17.433 8 15.5 8C13.567 8 12 6.433 12 4.5C12 2.567 13.567 1 15.5 1C17.433 1 19 2.567 19 4.5Z'
								stroke='#2A2A2A'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
						Настройки
					</div>
					<div className='options__account'>
						<div className='account__avatar'>
							<img src='/img/Oval.jpg' alt='' />
						</div>
						<div className='account__name'>
							<span>Frankie Sullivan</span>
						</div>
					</div>
				</div>
			</div>
			<header className='App-header'></header>
		</div>
	)
}

export default App
