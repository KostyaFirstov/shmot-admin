import React from 'react'

interface IStatisticCardProps {
	icon: React.ReactElement
	name: string
	param: string
	error: boolean | null
	handleClick?: () => void
}

const StatisticCard: React.FC<IStatisticCardProps> = ({
	icon,
	name,
	param,
	error,
	handleClick
}) => {
	return (
		<div
			onClick={handleClick}
			className={`${
				error === null
					? 'statistic__item-usuall'
					: error
					? 'statistic__item-error'
					: ''
			} ${handleClick ? 'click' : ''} statistic__item`}
		>
			<div className='statistic__icon'>{icon}</div>
			<div className='statistic__info'>
				<div className='statistic__name'>{name}</div>
				<div className='statistic__param'>{param}</div>
			</div>
		</div>
	)
}

export default StatisticCard
