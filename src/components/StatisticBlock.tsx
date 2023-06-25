import React from 'react'
import StatisticCardLoader from './StatisticCard/StatisticCardLoader'
import StatisticCard, { IStatisticCardProps } from './StatisticCard'
import { LoadingProperty } from '../redux/slices/auth'

interface IStatisticBlockProps {
	cards: IStatisticCardProps[]
	status: LoadingProperty
}

const StatisticBlock: React.FC<IStatisticBlockProps> = ({ cards, status }) => {
	return (
		<div className='statistic__wrapper'>
			{status === 'loading'
				? [...new Array(4)].map((item, index) => (
						<StatisticCardLoader key={index} />
				  ))
				: cards.map((card, index) => <StatisticCard key={index} {...card} />)}
		</div>
	)
}

export default StatisticBlock
