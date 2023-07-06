import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import { Link } from 'react-router-dom'
import PieChart from '../components/PieChart'
import DoughnutChart from '../components/DoughnutChart'
import TimeAgo from 'react-timeago'
import axios from '../axios'
import { LoadingProperty } from '../redux/slices/auth'
import NotFound from '../components/NotFound'
import { RequestState } from '../redux/slices/requests'

export type ReviewState = {
	_id: number
	title: number
	tags: string[]
	viewsCount: number
	createdAt: number
}

const Analytics = () => {
	const [requests, setRequests] = React.useState<RequestState[]>()
	const [reviews, setReviews] = React.useState<ReviewState[]>()
	const [isMounted, setIsMounted] = React.useState(
		LoadingProperty.STATUS_LOADING
	)

	React.useEffect(() => {
		const getRequests = async () => {
			try {
				const { data } = await axios.get<RequestState[]>(
					'/api/requests?all=true'
				)
				setRequests(data)
				setIsMounted(LoadingProperty.STATUS_LOADED)
			} catch (error) {
				console.log(error)
				setIsMounted(LoadingProperty.STATUS_ERROR)
			}
		}
		getRequests()
	}, [])

	React.useEffect(() => {
		const getReviews = async () => {
			try {
				const { data } = await axios.get<ReviewState[]>(
					'/api/reviews?popular=true'
				)
				setReviews(data)
				setIsMounted(LoadingProperty.STATUS_LOADED)
			} catch (error) {
				console.log(error)
				setIsMounted(LoadingProperty.STATUS_ERROR)
			}
		}
		getReviews()
	}, [])

	return (
		<ContentLayout title='Подробная аналитика по сайту'>
			<div className='statistic'>
				{isMounted !== 'error' ? (
					<div className='statistic__info-chart'>
						<div className='statistic__panel'>
							<div className='statistic__card statistic__card-short statistic__card-members'>
								<div className='card-members__title'>
									<h2>Запросы по популярности</h2>
								</div>
								<div className='card-members__list'>
									{requests?.map(req => (
										<Link to='/' className='card-members__item'>
											<div className='card-members__image'>
												<h3>{req.popular}</h3>
											</div>
											<div className='card-members__name'>{req.text}</div>
											<div className='card-members__profile'>
												<span>{req.isApproved ? 'Виден всем' : 'Скрыт'}</span>
											</div>
											<div className='card-members__change'>Изменить</div>
										</Link>
									))}
								</div>
							</div>
							<div className='statistic__chart'>
								{requests && <DoughnutChart stats={requests} />}
							</div>
						</div>
						<div className='statistic__panel'>
							<div className='statistic__chart'>
								{reviews && <PieChart stats={reviews} />}
							</div>
							<div className='statistic__card statistic__card-members'>
								<div className='card-members__title'>
									<h2>Обзоры по популярности</h2>
								</div>
								<div className='card-members__list'>
									{reviews?.map(review => (
										<Link to={'/'} className='card-members__item'>
											<div className='card-members__image'>
												<h3>{review.viewsCount}</h3>
											</div>
											<div className='card-members__name'>
												<h3>{review.title}</h3>
											</div>
											<div className='card-members__name'>
												<h3>{review.tags}</h3>
											</div>
											<div className='card-members__status'>
												<span>
													<TimeAgo date={review.createdAt} />
												</span>
											</div>
											<div className='card-members__profile'>Смотреть</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				) : (
					<NotFound
						title='Ошибка...'
						desc='Не удалось загрузить аналитику, попробуйте позже!'
					/>
				)}
			</div>
		</ContentLayout>
	)
}

export default Analytics
