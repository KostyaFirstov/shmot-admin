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
							: headers.map((title, index) => {
									return (
										<div key={index} className='table-header__item'>
											{title}
										</div>
									)
							  })}
					</div>
					<div className='table-main__list'>
						{status === 'loading'
							? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
							: drops.map((item, index) => (
									<Link
										key={index}
										to={`/admin/drop-add/${item.title}/edit`}
										className='table-main__item'
									>
										<div className='table-main__inner'>
											<h3>{item.title}</h3>
										</div>
										<div className='table-main__inner'>
											<span>{item.viewsCount}</span>
										</div>
										<div className='table-main__inner'>
											<span>{item.date}</span>
										</div>
										<div className='table-main__inner'>
											<span>
												<TimeAgo date={item.createdAt} />
											</span>
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
