import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Form.module.scss'
import axios from '../../axios'

type CategoryInputs = {
	_id: number
	name: string
	link: string
}

const DropForm = () => {
	const [values, setValues] = React.useState<CategoryInputs>()

	const navigate = useNavigate()
	const { title } = useParams()
	const isEditing = Boolean(title)

	React.useEffect(() => {
		const fetchCategory = async () => {
			try {
				const { data } = await axios.get(`/api/categories/${title}`)
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

	const onSubmit: SubmitHandler<CategoryInputs> = async data => {
		const userData = {
			name: data.name,
			link: data.link
		}

		isEditing
			? await axios.put(`/api/categories/${values?._id}`, userData)
			: await axios.post('/api/categories', userData)
		navigate(`/admin/categories/`)
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
				{isEditing ? 'Изменить категорию' : 'Добавить категорию'}
			</button>
		</form>
	)
}

export default DropForm
