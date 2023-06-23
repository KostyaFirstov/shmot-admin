import React from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { StatsState } from '../pages/Main'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
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
			text: 'Chart.js Line Chart'
		}
	}
}

interface IAreaChartProps {
	label: string
	stats: StatsState[]
}

const AreaChart: React.FC<IAreaChartProps> = ({ label, stats }) => {
	const data = {
		labels: stats.map(label => label.month),
		datasets: [
			{
				fill: true,
				label: label,
				data: stats.map(stat => stat.value),
				borderColor: '#e5e5e5',
				backgroundColor: '#23cfc9'
			}
		]
	}

	return <Line options={options} data={data} />
}

export default AreaChart
