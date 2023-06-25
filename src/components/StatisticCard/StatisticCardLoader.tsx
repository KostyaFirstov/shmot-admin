import React from 'react'
import ContentLoader from 'react-content-loader'

const StatisticCardLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={'100%'}
		height={120}
		viewBox='0 0 100% 120'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<rect x='0' y='0' rx='10' ry='10' width='100%' height='120' />
	</ContentLoader>
)

export default StatisticCardLoader
