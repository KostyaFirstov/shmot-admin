import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { RequestState } from '../redux/slices/requests'

ChartJS.register(ArcElement, Tooltip, Legend)

interface IDoughnutChartProps {
	stats: RequestState[]
}

const DoughnutChart: React.FC<IDoughnutChartProps> = ({ stats }) => {
	const data = {
		labels: stats.map(label => label.text),
		datasets: [
			{
				label: 'Искали раз',
				data: stats.map(vote => vote.popular),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
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
