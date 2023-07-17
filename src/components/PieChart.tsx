import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { ReviewState } from '../pages/Analytics'

ChartJS.register(ArcElement, Tooltip, Legend)

interface IPieChartProps {
	stats: ReviewState[]
}

const PieChart: React.FC<IPieChartProps> = ({ stats }) => {
	const data = {
		labels: stats.map(label => label.title),
		datasets: [
			{
				label: 'просмотров',
				data: stats.map(label => label.viewsCount),
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

	return <Pie data={data} />
}

export default PieChart
