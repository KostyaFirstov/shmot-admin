import React from 'react'
import { Link } from 'react-router-dom'

export interface IStatisticCardProps {
	icon: React.ReactElement
	name: string
	param: string
	growth: boolean | null
	percent?: number
	link?: string
}

const StatisticCard: React.FC<IStatisticCardProps> = ({
	icon,
	name,
	param,
	growth,
	percent,
	link
}) => {
	return (
		<Link to={`${link ? link : ''}`}>
			<div
				className={`${
					growth === null
						? 'statistic__item-usuall'
						: !growth
						? 'statistic__item-error'
						: ''
				} statistic__item`}
			>
				<div className='statistic__icon'>{icon}</div>
				<div className='statistic__info'>
					<div className='statistic__name'>{name}</div>
					<div className='statistic__param'>{param}</div>
					{percent && (
						<span className='statistic__percent'>
							{growth ? '+' : '-'}
							{percent}%
						</span>
					)}
				</div>
			</div>
		</Link>
	)
}

export default StatisticCard
