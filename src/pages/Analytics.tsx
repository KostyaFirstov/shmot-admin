import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import { Link } from 'react-router-dom'
import PieChart from '../components/PieChart'
import DoughnutChart from '../components/DoughnutChart'
import AreaChart from '../components/AreaChart'

const Analytics = () => {
	return (
		<ContentLayout title='Подробная аналитика по сайту.'>
			<div className='statistic'>
				<div className='statistic__info-chart'>
					<div className='statistic__panel'>
						<div className='statistic__card statistic__card-members'>
							<div className='card-members__title'>
								<h2>Самые популярные товары</h2>
							</div>
							<div className='card-members__list'>
								<Link to='/' className='card-members__item'>
									<div className='card-members__image'>
										<img src='/img/Oval.jpg' alt='' />
									</div>
									<div className='card-members__name'>
										<h3>newuser</h3>
									</div>
									<div className='card-members__profile'>Смотреть</div>
								</Link>
							</div>
						</div>
						<div className='statistic__chart'>
							<DoughnutChart />
						</div>
					</div>
					<div className='statistic__panel'>
						<div className='statistic__chart'>
							<PieChart />
						</div>
						<div className='statistic__card statistic__card-members'>
							<div className='card-members__title'>
								<h2>Самые популярные обзоры</h2>
							</div>
							<div className='card-members__list'>
								<Link to={'/'} className='card-members__item'>
									<div className='card-members__image'>
										<img src='/img/Oval.jpg' alt='' />
									</div>
									<div className='card-members__name'>
										<h3>Victor Br.</h3>
									</div>
									<div className='card-members__name'>
										<h3>Nike Dunk Low</h3>
									</div>
									<div className='card-members__status'>
										<span>Ожидание</span>
									</div>
									<div className='card-members__profile'>Смотреть</div>
								</Link>
							</div>
						</div>
					</div>
					<div className='statistic__panel'>
						<div className='statistic__card statistic__card-members'>
							<div className='card-members__title'>
								<h2>Общее количество пользователей</h2>
							</div>
							<div className='card-members__list'>
								<Link to='/' className='card-members__item'>
									<div className='card-members__image'>
										<img src='/img/Oval.jpg' alt='' />
									</div>
									<div className='card-members__name'>
										<h3>newuser</h3>
									</div>
									<div className='card-members__profile'>Смотреть</div>
								</Link>
							</div>
						</div>
						<div className='statistic__chart'>
							<AreaChart />
						</div>
					</div>
				</div>
			</div>
		</ContentLayout>
	)
}

export default Analytics
