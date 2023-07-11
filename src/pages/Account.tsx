import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAccount } from '../redux/slices/auth'
import ContentLayout from '../layouts/ContentLayout'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'

const Account = () => {
	const account = useSelector(selectAccount)
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<ContentLayout title='Мой аккаунт'>
			<div className='account'>
				<div className='account__wrapper'>
					<div className='account__info'>
						<img
							className='account__image'
							src={`http://localhost:5000${account?.avatar}`}
							alt={'avatar'}
						/>
						<div className='account__name'>
							<h2>{account?.username}</h2>
						</div>
					</div>
					<div className='account__details'>
						<div>
							Дата регистрации:{' '}
							<TimeAgo date={account ? account.createdAt : ''} />
						</div>
						<div>Email: {account?.email}</div>
					</div>
					<Link
						to={`/admin/user-add/${account?._id}/edit`}
						className='account__change'
					>
						Изменить
					</Link>
					<button className='account__logout' onClick={handleLogout}>
						Выйти
					</button>
				</div>
			</div>
		</ContentLayout>
	)
}

export default Account
