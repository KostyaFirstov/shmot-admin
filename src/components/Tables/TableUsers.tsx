import React from 'react'
import { Link } from 'react-router-dom'
import { AccountState } from '../../pages/Main'
import TimeAgo from 'react-timeago'
import NotFound from '../NotFound'
import { LoadingProperty } from '../../redux/slices/auth'
import Skeleton from '../Skeleton'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { fetchRemoveUser, removeUser } from '../../redux/slices/users'

interface ITableProps {
	headers: string[]
	users: AccountState[]
	status: LoadingProperty
}

const Table: React.FC<ITableProps> = ({ headers, users, status }) => {
	const dispatch = useDispatch()
	const appDispatch = useAppDispatch()

	const handleRemove = (id: number) => {
		if (window.confirm('Вы точно хотите удалить этого пользователя?')) {
			dispatch(removeUser(id))
			appDispatch(fetchRemoveUser(id))
		}
	}

	return (
		<div className='table'>
			{status === 'loaded' && users.length === 0 ? (
				<NotFound title='Пусто :(' desc='Ни одного пользователя не найдено' />
			) : status === 'error' ? (
				<NotFound
					title='Ошибка...'
					desc='Не удалось загрузить пользователей, попробуйте позже!'
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
							: users.map((item, index) => (
									<div key={index} className='table-main__item-outer'>
										<Link
											key={index}
											to={`/admin/user/${item.username}`}
											className='table-main__item'
										>
											<div className='table-main__inner'>
												<img src={item.avatar} alt='' />
												<h3>{item.username}</h3>
											</div>
											<div className='table-main__inner'>
												<span>{item.email}</span>
											</div>
											<div className='table-main__inner'>
												<span>{item.orders}</span>
											</div>
											<div className='table-main__inner'>
												<span>
													<TimeAgo date={item.createdAt} />
												</span>
											</div>
										</Link>
										<button
											onClick={() => handleRemove(item._id)}
											className='table-main__remove'
										>
											<svg
												width='20'
												height='20'
												viewBox='0 0 20 20'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M16.25 5L15 17.5H5L3.75 5' stroke='black' />
												<path
													d='M6.25 5V3.76875C6.25 3.60214 6.28282 3.43715 6.34658 3.28322C6.41034 3.12929 6.50379 2.98942 6.62161 2.87161C6.85954 2.63367 7.18226 2.5 7.51875 2.5H12.4812C12.6479 2.5 12.8128 2.53282 12.9668 2.59658C13.1207 2.66034 13.2606 2.75379 13.3784 2.87161C13.4962 2.98942 13.5897 3.12929 13.6534 3.28322C13.7172 3.43715 13.75 3.60214 13.75 3.76875V5'
													stroke='black'
												/>
												<path d='M2.5 5H17.5' stroke='black' />
												<path d='M7.5 8.75L12.5 13.75' stroke='black' />
												<path d='M12.5 8.75L7.5 13.75' stroke='black' />
											</svg>
										</button>
									</div>
							  ))}
					</div>
				</>
			)}
		</div>
	)
}

export default Table
