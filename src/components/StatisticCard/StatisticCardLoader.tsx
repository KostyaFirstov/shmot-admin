import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from '../Skeleton/Skeleton.module.scss'

const StatisticCardLoader = (props: any) => (
	<div className={styles.root}>
		<ContentLoader
			speed={2}
			width={100}
			height={120}
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
			{...props}
		>
			<rect x='0' y='0' rx='10' ry='10' width='100' height='120' />
		</ContentLoader>
	</div>
)

export default StatisticCardLoader
