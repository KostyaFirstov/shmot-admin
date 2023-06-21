import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ISidebarColumn {
	title: string
	links: { name: string; url: string }[]
}

const SidebarColumn: React.FC<ISidebarColumn> = ({ title, links }) => {
	const location = useLocation()

	return (
		<div className='sidebar__column'>
			<div className='sidebar__title'>
				<span>{title}</span>
			</div>
			<ul className='sidebar__links'>
				{links.map((link, index) => {
					return (
						<li
							key={index}
							className={`${
								location.pathname === link.url ? 'active' : ''
							} sidebar__link`}
						>
							<Link to={link.url}>{link.name}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default SidebarColumn
