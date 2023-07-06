import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Form.module.scss'
import axios from '../../axios'

type CategoryInputs = {
	_id: number
	text: string
	popular: number
	isApproved: boolean
}

const RequestForm = () => {
	const [values, setValues] = React.useState<CategoryInputs>()

	const navigate = useNavigate()
	const { id } = useParams()
	const isEditing = Boolean(id)

	React.useEffect(() => {
		const fetchCategory = async () => {
			try {
				const { data } = await axios.get(`/api/requests/${id}`)
				setValues(data)
			} catch (error) {
				console.log(error)
			}
		}

		isEditing && fetchCategory()
	}, [])

	React.useEffect(() => {
		const setValues = () => {
			if (values) {
				setValue('text', values?.text)
				setValue('popular', values?.popular)
				setValue('isApproved', values?.isApproved)
			}
		}

		setValues()
	}, [values])

	const onSubmit: SubmitHandler<CategoryInputs> = async data => {
		const userData = {
			text: data.text,
			popular: data.popular,
			isApproved: data.isApproved
		}

		isEditing
			? await axios.put(`/api/requests/${values?._id}`, userData)
			: await axios.post('/api/requests', userData)
		navigate(`/admin/requests/`)
	}

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isValid }
	} = useForm<CategoryInputs>({
		mode: 'onSubmit'
	})

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Текст запроса</h2>
				</div>
				<input
					className={errors.text && 'error'}
					type='text'
					placeholder='Nike..'
					{...register('text', {
						required: true
					})}
				/>
				{errors.text && (
					<div className={styles.form__error}>
						Текст запроса указано некорректно
					</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Видимость</h2>
				</div>
				<input
					className={errors.isApproved && 'error'}
					type='text'
					placeholder='true или false'
					{...register('isApproved', {
						required: true
					})}
				/>
				{errors.isApproved && (
					<div className={styles.form__error}>
						Видимость указана некорректно
					</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Популярность</h2>
				</div>
				<input
					className={errors.popular && 'error'}
					placeholder='Например: "men"'
					{...register('popular', {
						required: true
					})}
				/>
				{errors.popular && (
					<div className={styles.form__error}>
						Популярность указана некорректно
					</div>
				)}
			</div>
			<button type='submit' className={styles.form__button}>
				{isEditing ? 'Изменить запрос' : 'Добавить запрос'}
			</button>
		</form>
	)
}

export default RequestForm
