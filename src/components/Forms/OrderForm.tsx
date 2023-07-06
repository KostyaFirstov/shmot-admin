import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Form.module.scss'
import axios from '../../axios'
import { OrderState } from '../../pages/Main'

const OrderForm = () => {
	const [values, setValues] = React.useState<OrderState>()

	const navigate = useNavigate()
	const { id } = useParams()

	React.useEffect(() => {
		const fetchOrder = async () => {
			try {
				const { data } = await axios.get(`/api/orders/${id}`)
				setValues(data[0])
			} catch (error) {
				console.log(error)
			}
		}

		fetchOrder()
	}, [])

	React.useEffect(() => {
		const setValues = () => {
			if (values) {
				setValue('status', values?.status)
				setValue('address', values?.address)
			}
		}

		setValues()
	}, [values])

	const onSubmit: SubmitHandler<OrderState> = async data => {
		const orderData = {
			status: data.status,
			address: data.address
		}

		await axios.put(`/api/orders/${values?._id}`, orderData)
		navigate(`/admin/orders/`)
	}

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isValid }
	} = useForm<OrderState>({
		mode: 'onSubmit'
	})

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Статус заказа</h2>
				</div>
				<input
					className={errors.status && 'error'}
					type='text'
					placeholder='В обработке | Передан в доставку | Доставлен'
					{...register('status', {
						required: true
					})}
				/>
				{errors.status && (
					<div className={styles.form__error}>Статус указан некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Адрес</h2>
				</div>
				<input
					className={errors.address && 'error'}
					placeholder='Например: "men"'
					{...register('address', {
						required: true
					})}
				/>
				{errors.address && (
					<div className={styles.form__error}>Адрес указан некорректно</div>
				)}
			</div>
			<button type='submit' className={styles.form__button}>
				Изменить заказ
			</button>
		</form>
	)
}

export default OrderForm
