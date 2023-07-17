import React from 'react'
import { Link } from 'react-router-dom'
import LineChart from '../components/LineChart'
import ContentLayout from '../layouts/ContentLayout'
import axios from '../axios'
import TimeAgo from 'react-timeago'
import AreaChart from '../components/AreaChart'
import StatisticBlock from '../components/StatisticBlock'
import { LoadingProperty, selectAccount } from '../redux/slices/auth'
import NotFound from '../components/NotFound'
import { useSelector } from 'react-redux'
import TableOrders from '../components/Tables/TableOrders'

export type AccountState = {
	_id: number
	username: string
	email: string
	orders: number
	reviews: string
	promocodes: number
	createdAt: string
	avatar: string
}

export type OrderState = {
	_id: number
	userName: string
	userId: string
	products: { productId: string; quantity: number }[]
	price: number
	address: string
	status: string
	createdAt: string
}

export type StatsState = {
	month: string
	value: string
}

export type PercUserState = {
	error: number
	param: string
}

type StatsReq = {
	_id: number
	total: string
}

const Main = () => {
	const [users, setUsers] = React.useState<AccountState[]>([])
	const [userStats, setUserStats] = React.useState<StatsState[]>([])
	const [orderStats, setOrderStats] = React.useState<StatsState[]>([])
	const [orders, setOrders] = React.useState<OrderState[]>([])
	const [percIncome, setPercIncome] = React.useState<PercUserState>()
	const [percUser, setPercUser] = React.useState<PercUserState>()
	const [isMounted, setIsMounted] = React.useState(
		LoadingProperty.STATUS_LOADING
	)
	const account = useSelector(selectAccount)

	const MONTHS = React.useMemo(
		() => [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		],
		[]
	)

	const mainCards = [
		{
			icon: (
				<svg
					width='65'
					height='65'
					viewBox='0 0 65 65'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle cx='32.5' cy='32.5' r='32.5' fill='#F4F7FE' />
					<path
						opacity='0.35'
						d='M41.2358 46.1086H22.6643C20.0999 46.1086 18.0215 44.0302 18.0215 41.4658V22.8943C18.0215 20.3299 20.0999 18.2515 22.6643 18.2515H41.2358C43.8002 18.2515 45.8786 20.3299 45.8786 22.8943V41.4658C45.8786 44.0302 43.8002 46.1086 41.2358 46.1086Z'
						fill='#23CFC9'
					/>
					<path
						d='M45.8786 36.8228V41.4656C45.8786 44.03 43.8002 46.1085 41.2358 46.1085H22.6643C20.0999 46.1085 18.0215 44.03 18.0215 41.4656V36.8228H24.7412C25.9809 36.8228 27.1896 37.4898 27.6709 38.6319C28.3751 40.2987 30.0233 41.4656 31.9501 41.4656C33.8768 41.4656 35.5251 40.2987 36.2292 38.6319C36.7105 37.4898 37.9177 36.8228 39.1589 36.8228H45.8786Z'
						fill='#23CFC9'
					/>
				</svg>
			),
			name: 'Доход',
			param: `${percIncome?.param} ₽`,
			growth: percIncome?.error ? percIncome.error > 0 : null,
			percent: percIncome?.error ? +percIncome.error.toFixed(2) : 0,
			link: '/admin/orders'
		},
		{
			icon: (
				<svg
					width='65'
					height='65'
					viewBox='0 0 65 65'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle cx='32.5' cy='32.5' r='32.5' fill='#F4F7FE' />
					<path
						opacity='0.35'
						d='M31.95 32.1798C36.2236 32.1798 39.6881 28.7153 39.6881 24.4417C39.6881 20.1681 36.2236 16.7036 31.95 16.7036C27.6764 16.7036 24.2119 20.1681 24.2119 24.4417C24.2119 28.7153 27.6764 32.1798 31.95 32.1798Z'
						fill='#E64646'
					/>
					<path
						d='M41.2358 36.8228H22.6643C20.0999 36.8228 18.0215 38.9012 18.0215 41.4656C18.0215 44.03 20.0999 46.1085 22.6643 46.1085H41.2358C43.8002 46.1085 45.8786 44.03 45.8786 41.4656C45.8786 38.9012 43.8002 36.8228 41.2358 36.8228Z'
						fill='#E64646'
					/>
				</svg>
			),
			name: 'Пользователей',
			param: percUser ? percUser.param : '',
			growth: percUser ? percUser.error > 0 : null,
			percent: percUser ? percUser?.error : 0,
			link: '/admin/users'
		},
		{
			icon: (
				<svg
					width='65'
					height='65'
					viewBox='0 0 65 65'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle cx='32.5' cy='32.5' r='32.5' fill='#F4F7FE' />
					<path
						opacity='0.35'
						d='M21.5316 30.2173C20.0211 28.7069 17.5712 28.7069 16.0592 30.2173C14.5472 31.7278 14.5487 34.1777 16.0592 35.6897L23.2479 42.8784C25.4904 45.1209 29.1242 45.1209 31.3667 42.8784L32.7797 41.4654L21.5316 30.2173Z'
						fill='#23CFC9'
					/>
					<path
						d='M47.8414 20.9317C46.3309 19.4212 43.8811 19.4212 42.369 20.9317L27.3076 35.9931L32.78 41.4655L47.8414 26.4041C49.3519 24.892 49.3519 22.4422 47.8414 20.9317Z'
						fill='#23CFC9'
					/>
				</svg>
			),
			name: 'Заказов',
			param: `${orders.length}`,
			growth: percUser?.error ? Boolean(percUser.error) : null,
			link: '/admin/orders'
		},
		{
			icon: (
				<svg
					width='65'
					height='65'
					viewBox='0 0 65 65'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle cx='32.5' cy='32.5' r='32.5' fill='#F4F7FE' />
					<path
						opacity='0.35'
						d='M29.6284 16.7036C22.3639 16.7036 16.4736 22.5939 16.4736 29.8584C16.4736 31.9523 16.9751 33.924 17.8464 35.6821L16.5247 40.9687C16.2229 42.1728 17.314 43.2639 18.518 42.9621L23.8047 41.6404C25.5628 42.5117 27.5345 43.0131 29.6284 43.0131C36.8929 43.0131 42.7832 37.1229 42.7832 29.8584C42.7832 22.5939 36.8929 16.7036 29.6284 16.7036Z'
						fill='#23CFC9'
					/>
					<path
						d='M45.4099 37.7466L47.3769 45.6116C47.6787 46.8156 46.5876 47.9067 45.3836 47.6049L37.5186 45.6379L45.4099 37.7466Z'
						fill='#23CFC9'
					/>
					<path
						d='M40.9479 23.1821C42.107 25.1399 42.7833 27.418 42.7833 29.8586C42.7833 37.1231 36.8931 43.0133 29.6286 43.0133C27.188 43.0133 24.9099 42.337 22.9521 41.1778C25.2411 45.0515 29.4475 47.6562 34.2714 47.6562C41.536 47.6562 47.4262 41.7659 47.4262 34.5014C47.4262 29.6775 44.8216 25.4711 40.9479 23.1821Z'
						fill='#23CFC9'
					/>
				</svg>
			),
			name: 'Сообщений',
			param: '0',
			growth: true
		}
	]

	React.useEffect(() => {
		const getIncomeStats = async () => {
			try {
				const { data } = await axios.get<StatsReq[]>('/api/orders/income')

				data.map(item =>
					setOrderStats(prev => [
						...prev,
						{ month: MONTHS[item._id - 1], value: item.total }
					])
				)

				const newPerc = {
					...percIncome,
					error:
						(+data[data.length - 1].total * 100) / +data[data.length - 2].total,
					param: data[data.length - 1].total
				}

				setPercIncome(newPerc)
				setIsMounted(LoadingProperty.STATUS_LOADED)
			} catch (error) {
				console.log(error)
				setIsMounted(LoadingProperty.STATUS_ERROR)
			}
		}
		getIncomeStats()
	}, [])

	React.useEffect(() => {
		const getStats = async () => {
			try {
				const { data } = await axios.get<StatsReq[]>('/api/users/stats')

				data.map(item =>
					setUserStats(prev => [
						...prev,
						{ month: MONTHS[item._id - 1], value: item.total }
					])
				)

				const newPerc = {
					...percUser,
					error:
						(+data[data.length - 1].total * 100) / +data[data.length - 2].total,
					param: data[data.length - 1].total
				}

				setPercUser(newPerc)
				setIsMounted(LoadingProperty.STATUS_LOADED)
			} catch (error) {
				console.log(error)
				setIsMounted(LoadingProperty.STATUS_ERROR)
			}
		}
		getStats()
	}, [MONTHS])

	React.useEffect(() => {
		const getUsers = async () => {
			try {
				const { data } = await axios.get<AccountState[]>('/api/users?new=true')
				setUsers(data)
				setIsMounted(LoadingProperty.STATUS_LOADED)
			} catch (error) {
				console.log(error)
				setIsMounted(LoadingProperty.STATUS_ERROR)
			}
		}
		getUsers()
	}, [])

	React.useEffect(() => {
		const getOrders = async () => {
			try {
				const { data } = await axios.get<OrderState[]>('/api/orders?new=true')
				setOrders(data)
				setIsMounted(LoadingProperty.STATUS_LOADED)
			} catch (error) {
				console.log(error)
				setIsMounted(LoadingProperty.STATUS_ERROR)
			}
		}
		getOrders()
	}, [])

	return (
		<ContentLayout title={`Приветствую, ${account?.username}`}>
			<div className='statistic'>
				<div className='statistic__desc'>
					<h2>Статистика за последний месяц:</h2>
				</div>
				{isMounted !== 'error' ? (
					<>
						<StatisticBlock status={isMounted} cards={mainCards} />
						<div className='statistic__info-chart'>
							<div className='statistic__panel'>
								<div className='statistic__chart'>
									<LineChart userStats={userStats} />
								</div>
								<div className='statistic__card statistic__card-members'>
									<div className='card-members__title'>
										<h2>Последние пользователи</h2>
									</div>
									<div className='card-members__list'>
										{users.map((user, index) => {
											return (
												<Link
													key={index}
													to={`/admin/user-add/${user._id}/edit`}
													className='card-members__item'
												>
													<div className='card-members__image'>
														<img
															src={`http://localhost:5000${user.avatar}`}
															alt='user'
														/>
													</div>
													<div className='card-members__name'>
														<h3>{user.username}</h3>
													</div>
													<div className='card-members__createdAt'>
														<TimeAgo date={user.createdAt} />
													</div>
												</Link>
											)
										})}
									</div>
								</div>
							</div>
							<div className='statistic__panel statistic__panel-full'>
								<div className='statistic__card statistic__card-members'>
									<div className='statistic__chart'>
										<AreaChart label='Доход' stats={orderStats} />
									</div>
									<div className='card-members__list'>
										<div className='card-members__title'>
											<h2>Последние заказы</h2>
										</div>
										<TableOrders
											headers={['Пользователь', 'Статус', 'Цена', 'Дата']}
											orders={orders}
											status={isMounted}
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<NotFound
						title='Ошибка...'
						desc='Не удалось загрузить статистику, попробуйте позже!'
					/>
				)}
			</div>
		</ContentLayout>
	)
}

export default Main
