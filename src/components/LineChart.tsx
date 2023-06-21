import React from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import axios from '../axios'
import { UserStatsState } from '../pages/Main'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'bottom' as const
		},
		title: {
			display: false,
			text: 'Пользователи'
		}
	}
}

interface ILineChart {
	userStats: UserStatsState[]
}

const LineChart: React.FC<ILineChart> = ({ userStats }) => {
	const data = {
		labels: userStats.map(label => label.month),
		datasets: [
			{
				label: 'Пользователи',
				data: userStats.map(label => label.value),
				borderColor: 'rgb(35, 207, 201)',
				backgroundColor: 'black'
			}
		]
	}

	return <Line options={options} data={data} />
}

export default LineChart
