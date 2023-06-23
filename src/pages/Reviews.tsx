import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import Table from '../components/TableProducts'
import { useAppDispatch } from '../redux/store'
import { fetchReviews, selectReviews } from '../redux/slices/reviews'
import { useSelector } from 'react-redux'
import StatisticCard from '../components/StatisticCard'

const Reviews = () => {
	const { reviews, status } = useSelector(selectReviews)

	const appDispatch = useAppDispatch()

	React.useEffect(() => {
		appDispatch(fetchReviews())
	}, [])

	const reviewsCards = [
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
						d='M20.5 32L32.5528 38.0264C32.7168 38.1083 32.7988 38.1493 32.8848 38.1655C32.9609 38.1798 33.0391 38.1798 33.1152 38.1655C33.2012 38.1493 33.2832 38.1083 33.4472 38.0264L45.5 32M20.5 38.25L32.5528 44.2764C32.7168 44.3583 32.7988 44.3993 32.8848 44.4155C32.9609 44.4298 33.0391 44.4298 33.1152 44.4155C33.2012 44.3993 33.2832 44.3583 33.4472 44.2764L45.5 38.25M20.5 25.75L32.5528 19.7236C32.7168 19.6416 32.7988 19.6006 32.8848 19.5844C32.9609 19.5702 33.0391 19.5702 33.1152 19.5844C33.2012 19.6006 33.2832 19.6416 33.4472 19.7236L45.5 25.75L33.4472 31.7764C33.2832 31.8583 33.2012 31.8993 33.1152 31.9155C33.0391 31.9298 32.9609 31.9298 32.8848 31.9155C32.7988 31.8993 32.7168 31.8583 32.5528 31.7764L20.5 25.75Z'
						stroke='#23CFC9'
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
				</svg>
			),
			name: 'Всего обзоров',
			param: `${reviews.length}`,
			growth: null
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
						d='M33 17V47M18 32H48'
						stroke='#23CFC9'
						stroke-width='3'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
				</svg>
			),
			name: 'Добавить обзор',
			param: '',
			growth: null,
			link: '/admin/add-review'
		}
	]

	return (
		<ContentLayout title='Обзоры'>
			<div className='statistic__wrapper'>
				{reviewsCards.map((review, index) => (
					<StatisticCard key={index} {...review} />
				))}
			</div>
			<Table
				headers={['Название', 'Описание', 'Просмотры', 'Дата']}
				reviews={reviews}
			/>
		</ContentLayout>
	)
}

export default Reviews
