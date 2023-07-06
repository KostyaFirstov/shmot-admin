import React from 'react'
import { useSelector } from 'react-redux'
import { selectAccount } from '../redux/slices/auth'
import ContentLayout from '../layouts/ContentLayout'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'

const Account = () => {
	const account = useSelector(selectAccount)

	return (
		<ContentLayout title='Мой аккаунт'>
			<div className='account'>
				<div className='account__wrapper'>
					<div className='account__info'>
						<img
							className='account__image'
							src={`http://localhost:5000${account?.avatar}`}
							alt={account?.username}
						/>
						<div className='account__name'>
							<h2>{account?.username}</h2>
						</div>
					</div>
					<div className='account__details'>
						<div>
							Дата регистрации:
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
				</div>
			</div>
		</ContentLayout>
	)
}

export default Account
