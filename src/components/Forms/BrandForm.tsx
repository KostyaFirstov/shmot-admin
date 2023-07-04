import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Form.module.scss'
import axios from '../../axios'

type BrandInputs = {
	_id: number
	name: string
	link: string
}

const BrandForm = () => {
	const [values, setValues] = React.useState<BrandInputs>()

	const navigate = useNavigate()
	const { title } = useParams()
	const isEditing = Boolean(title)

	React.useEffect(() => {
		const fetchCategory = async () => {
			try {
				const { data } = await axios.get(`/api/brands/${title}`)
				setValues(data[0])
			} catch (error) {
				console.log(error)
			}
		}

		isEditing && fetchCategory()
	}, [])

	React.useEffect(() => {
		const setValues = () => {
			if (values) {
				setValue('name', values?.name)
				setValue('link', values?.link)
			}
		}

		setValues()
	}, [values])

	const onSubmit: SubmitHandler<BrandInputs> = async data => {
		const userData = {
			name: data.name,
			link: data.link
		}

		isEditing
			? await axios.put(`/api/brands/${values?._id}`, userData)
			: await axios.post('/api/brands', userData)
		navigate(`/admin/brands/`)
	}

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isValid }
	} = useForm<BrandInputs>({
		mode: 'onSubmit'
	})

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Имя</h2>
				</div>
				<input
					className={errors.name && 'error'}
					type='text'
					placeholder='Nike..'
					{...register('name', {
						required: true
					})}
				/>
				{errors.name && (
					<div className={styles.form__error}>Название указано некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Ссылка-Значение</h2>
				</div>
				<input
					className={errors.link && 'error'}
					placeholder='Например: "men"'
					{...register('link', {
						required: true
					})}
				/>
				{errors.link && (
					<div className={styles.form__error}>Ссылка указана некорректно</div>
				)}
			</div>
			<button type='submit' className={styles.form__button}>
				{isEditing ? 'Изменить бренд' : 'Добавить бренд'}
			</button>
		</form>
	)
}

export default BrandForm
