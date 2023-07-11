import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import styles from './Form.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import {
	fetchAuth,
	selectAccount,
	selectErrorAuth,
	selectIsAdmin,
	selectIsAuth
} from '../../redux/slices/auth'

type LoginInputs = {
	email: string
	password: string
	signed: boolean
}

const LoginForm = () => {
	const appDispatch = useAppDispatch()
	const isAuth = useSelector(selectIsAuth)
	const isAdmin = useSelector(selectIsAdmin)
	const errorAuth = useSelector(selectErrorAuth)
	const account = useSelector(selectAccount)

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isValid }
	} = useForm<LoginInputs>({
		mode: 'onSubmit'
	})

	if (isAuth && isAdmin) {
		return <Navigate to='/admin/' />
	}

	const onSubmit: SubmitHandler<LoginInputs> = async data => {
		const loginData = {
			email: data.email,
			password: data.password
		}

		appDispatch(fetchAuth(loginData))
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.form__input}>
				<input
					className={errors.email && 'error'}
					type='text'
					placeholder='E-mail'
					{...register('email', {
						required: 'Укажите почту',
						pattern:
							/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					})}
				/>
				{errors.email && (
					<div className='form__error'>Почта указана некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<input
					className={errors.password && 'error'}
					type='password'
					placeholder='Пароль'
					{...register('password', { required: 'Укажите пароль' })}
				/>
				{errors.password && <div className='form__error'>Не указан пароль</div>}
			</div>
			{errorAuth && <div className='error form__error-main'>{errorAuth}</div>}
			{isAdmin !== undefined && !isAdmin && (
				<div className='error form__error-main'>Доступ запрещён!</div>
			)}
			<button type='submit' className={styles.form__button}>
				Войти
			</button>
		</form>
	)
}

export default LoginForm
