import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Form.module.scss'
import axios from '../../axios'
import {
	fetchAuthUpdate,
	selectAccount,
	updateAdmin
} from '../../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'

export type UserInputs = {
	_id: number
	username: string
	email: string
	password: string
	isAdmin: boolean
	avatar: string
	orders: number
	createdAt: string
}

const UserForm = () => {
	const [values, setValues] = React.useState<UserInputs>()
	const [imagesUrl, setImagesUrl] = React.useState('')
	const inputFileRef = React.useRef<HTMLInputElement>(null)

	const account = useSelector(selectAccount)
	const appDispatch = useAppDispatch()
	const dispatch = useDispatch()

	const navigate = useNavigate()
	const { id } = useParams()
	const isEditing = Boolean(id)

	React.useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data } = await axios.get(`/api/users/${id}`)
				setValues(data)
			} catch (error) {
				console.log(error)
			}
		}

		isEditing && fetchUsers()
	}, [])

	React.useEffect(() => {
		const setValues = () => {
			if (values) {
				setValue('username', values?.username)
				setValue('email', values?.email)
				setValue('password', values?.password)
				setValue('isAdmin', values?.isAdmin)
				setValue('avatar', values?.avatar)
				setValue('orders', values?.orders)
				setImagesUrl(values?.avatar)
			}
		}

		setValues()
	}, [values])

	const handleChangeFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const formData = new FormData()
			if (event.target.files) {
				const file = event.target.files[0]
				formData.append('image', file)
				const { data } = await axios.post('/upload', formData)
				setImagesUrl(data.url)
			}
		} catch (error) {
			console.warn(error)
			alert('Ошибка при загрузке файлов')
		}
	}

	const onClickRemoveImage = () => {
		setImagesUrl('')
	}

	const onSubmit: SubmitHandler<UserInputs> = async data => {
		const userData = {
			username: data.username,
			email: data.email,
			password: data.password,
			isAdmin: data.isAdmin,
			avatar: imagesUrl,
			orders: data.orders
		}

		if (account?._id === values?._id) {
			appDispatch(fetchAuthUpdate({ id: values?._id, data: userData }))
			dispatch(
				updateAdmin({
					...account,
					avatar: userData.avatar,
					username: userData.username,
					email: userData.email,
					password: userData.password,
					isAdmim: userData.isAdmin,
					orders: userData.orders
				})
			)
		} else if (isEditing) {
			await axios.put(`/api/users/${values?._id}`, userData)
		} else {
			await axios.post('/api/auth/register', userData)
		}

		navigate(`/admin/users/`)
	}

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isValid }
	} = useForm<UserInputs>({
		mode: 'onSubmit'
	})

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Имя</h2>
				</div>
				<input
					className={errors.username && 'error'}
					type='text'
					placeholder='Nike..'
					{...register('username', {
						required: true
					})}
				/>
				{errors.username && (
					<div className={styles.form__error}>Название указано некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Email</h2>
				</div>
				<input
					className={errors.email && 'error'}
					placeholder='Этот товар....'
					{...register('email', {
						required: true
					})}
				/>
				{errors.email && (
					<div className={styles.form__error}>Описание указано некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Аватарка</h2>
				</div>
				<input
					className={styles.hide}
					ref={inputFileRef}
					type='file'
					onChange={handleChangeFile}
				/>
				<div className={styles.cards}>
					{imagesUrl !== '' ? (
						<div className={styles.card}>
							<img src={`http://localhost:5000${imagesUrl}`} alt='avatar' />
							<div
								onClick={onClickRemoveImage}
								className={styles.image__remove}
							>
								<svg
									width='21'
									height='20'
									viewBox='0 0 21 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M1.83883 1.16117L19.5165 18.8388M1.83883 18.8388L19.5165 1.16117'
										stroke='#23CFC9'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
						</div>
					) : (
						<div
							onClick={() => inputFileRef.current?.click()}
							className={styles.add}
						>
							<svg
								width='30'
								height='32'
								viewBox='0 0 30 32'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M16.75 2.76465H9.4C6.45972 2.76465 4.98958 2.76465 3.86655 3.34168C2.8787 3.84924 2.07555 4.65914 1.57222 5.65531C1 6.78778 1 8.27028 1 11.2353V22.5295C1 25.4946 1 26.9769 1.57222 28.1095C2.07555 29.1057 2.8787 29.9155 3.86655 30.4231C4.98958 31.0001 6.45972 31.0001 9.4 31.0001H20.6C23.5403 31.0001 25.0103 31.0001 26.1335 30.4231C27.1214 29.9155 27.9245 29.1057 28.4278 28.1095C29 26.9769 29 25.4946 29 22.5295V15.1177'
									stroke='#23CFC9'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M1 23.9417L8.51256 16.366C9.19598 15.6768 10.304 15.6768 10.9874 16.366L16.75 22.177M16.75 22.177L21.6376 17.2483C22.321 16.5592 23.429 16.5592 24.1124 17.2483L29 22.177M16.75 22.177L20.6875 26.1476'
									stroke='#23CFC9'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M25.5 9.82358V1M25.5 1L22 4.52943M25.5 1L29 4.52943'
									stroke='#23CFC9'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
					)}
				</div>
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Пароль</h2>
				</div>
				<input
					className={errors.password && 'error'}
					type='text'
					placeholder='Nike..'
					{...register('password', {
						// required: true
					})}
				/>
				{errors.password && (
					<div className={styles.form__error}>Пароль указан некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Роль</h2>
				</div>
				<input
					className={errors.isAdmin && 'error'}
					placeholder='Пользователь или админ'
					{...register('isAdmin', {
						required: true
					})}
				/>
				{errors.isAdmin && (
					<div className={styles.form__error}>Роль указана некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Заказы</h2>
				</div>
				<input
					className={errors.orders && 'error'}
					placeholder='0'
					{...register('orders', {
						required: true
					})}
				/>
				{errors.orders && (
					<div className={styles.form__error}>Заказы указаны некорректно</div>
				)}
			</div>
			<button type='submit' className={styles.form__button}>
				{isEditing ? 'Изменить пользователя' : 'Добавить пользователя'}
			</button>
		</form>
	)
}

export default UserForm
