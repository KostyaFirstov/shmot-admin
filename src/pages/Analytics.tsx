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
import TableReviews from '../components/Tables/TableReviews'
import TableRequests from '../components/Tables/TableRequests'

export type ReviewState = {
	_id: number
	title: number
	desc: string
	tags: string[]
	viewsCount: number
	createdAt: number
}

const Analytics = () => {
	const [requests, setRequests] = React.useState<RequestState[]>([])
	const [reviews, setReviews] = React.useState<ReviewState[]>([])
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
									<TableRequests
										headers={[
											'Текст запроса',
											'Видимость',
											'Кол. ведённых раз'
										]}
										requests={requests}
										status={isMounted}
									/>
								</div>
							</div>
							<div className='statistic__chart'>
								<DoughnutChart stats={requests} />
							</div>
						</div>
						<div className='statistic__panel'>
							<div className='statistic__card statistic__card-members'>
								<div className='card-members__title'>
									<h2>Обзоры по популярности</h2>
								</div>
								<div className='card-members__list'>
									<TableReviews
										headers={['Название', 'Описание', 'Просмотры', 'Дата']}
										reviews={reviews}
										status={isMounted}
									/>
								</div>
							</div>
							<div className='statistic__chart'>
								<PieChart stats={reviews} />
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
