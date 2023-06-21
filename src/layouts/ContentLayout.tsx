import React from 'react'

interface IContentLayoutProps {
	title: string
	children?: React.ReactNode
}

const ContentLayout: React.FC<IContentLayoutProps> = ({ title, children }) => {
	return (
		<div className='content'>
			<header className='content__header'>
				<div className='content__title'>
					<h1>{title}</h1>
				</div>
			</header>
			<div className='content__wrapper'>{children}</div>
		</div>
	)
}

export default ContentLayout
