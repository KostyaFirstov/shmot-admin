import React from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import { DropParams } from '../../redux/slices/drops'
import NotFound from '../NotFound'
import { LoadingProperty } from '../../redux/slices/auth'
import Skeleton from '../Skeleton'

interface ITableProps {
	headers: string[]
	drops: DropParams[]
	status: LoadingProperty
}

const Table: React.FC<ITableProps> = ({ headers, drops, status }) => {
	return (
		<div className='table'>
			{status === 'loaded' && drops.length === 0 ? (
				<NotFound title='Пусто :(' desc='Ни одного дропа не найдено' />
			) : status === 'error' ? (
				<NotFound
					title='Ошибка...'
					desc='Не удалось загрузить дропы, попробуйте позже!'
				/>
			) : (
				<>
					<div className='table-header__list'>
						{status === 'loading'
							? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
							: headers.map(title => {
									return <div className='table-header__item'>{title}</div>
							  })}
					</div>
					<div className='table-main__list'>
						{status === 'loading'
							? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
							: drops.map((item, index) => (
									<Link
										key={index}
										to={`/admin/reviews/${item.title}`}
										className='table-main__item'
									>
										<div className='table-main__inner'>
											<h3>{item.title}</h3>
										</div>
										<div className='table-main__inner'>
											<span>{item.desc}</span>
										</div>
										<div className='table-main__inner'>
											<span>{item.viewsCount}</span>
										</div>
										<div className='table-main__inner'>
											<span>
												<TimeAgo date={item.date} />
											</span>
										</div>
										<div className='table-main__view'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='#000000'
												width='800px'
												height='800px'
												viewBox='-3.5 0 32 32'
												version='1.1'
											>
												<title>view</title>
												<path d='M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z' />
											</svg>
										</div>
									</Link>
							  ))}
					</div>
				</>
			)}
		</div>
	)
}

export default Table
