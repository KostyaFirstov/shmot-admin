import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { RequestState } from '../redux/slices/requests'

ChartJS.register(ArcElement, Tooltip, Legend)

interface IDoughnutChartProps {
	stats: RequestState[]
}

const DoughnutChart: React.FC<IDoughnutChartProps> = ({ stats }) => {
	const filtredStats = stats.filter(val => val.popular > 0)

	const data = {
		labels: filtredStats.map(label => label.text),
		datasets: [
			{
				label: 'Искали раз',
				data: filtredStats.map(vote => vote.popular),
				backgroundColor: [
					'#23CFC9',
					'#485563',
					'#F5F5F5',
					'#2cb1b0',
					'#369296',
					'#3f747d'
				],
				borderColor: [
					'#23CFC9',
					'#485563',
					'#F5F5F5',
					'#2cb1b0',
					'#369296',
					'#3f747d'
				],
				borderWidth: 1
			}
		]
	}

	return (
		<div>
			<Doughnut data={data} />
		</div>
	)
}

export default DoughnutChart
