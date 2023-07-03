import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from './Skeleton.module.scss'

const Skeleton = (props: any) => (
	<div className={styles.root}>
		<ContentLoader
			speed={2}
			width={100}
			height={78}
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
			{...props}
		>
			<rect x='0' y='0' rx='10' ry='10' width='100' height='66' />
		</ContentLoader>
	</div>
)

export default Skeleton
