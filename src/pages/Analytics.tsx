import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import { Link } from 'react-router-dom'
import PieChart from '../components/PieChart'
import DoughnutChart from '../components/DoughnutChart'
import TimeAgo from 'react-timeago'
import axios from '../axios'

export type RequestsState = {
	_id: number
	text: string
	popular: number
	isApproved: boolean
}

export type ReviewState = {
	title: number
	tags: string[]
	viewsCount: number
	createdAt: number
}

const Analytics = () => {
	const [requests, setRequests] = React.useState<RequestsState[]>()
	const [reviews, setReviews] = React.useState<ReviewState[]>()

	React.useEffect(() => {
		const getRequests = async () => {
			try {
				const { data } = await axios.get<RequestsState[]>(
					'/api/requests?all=true'
				)
				setRequests(data)
			} catch (error) {
				console.log(error)
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
			} catch (error) {
				console.log(error)
			}
		}
		getReviews()
	}, [])

	return (
		<ContentLayout title='Подробная аналитика по сайту.'>
			<div className='statistic'>
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
			</div>
		</ContentLayout>
	)
}

export default Analytics
