import axios from '../../axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Form.module.scss'

export type ReviewInputs = {
	_id: number
	title: string
	desc: string
	text: string
	img: string[]
	tags: string
}

type ImageUrlType = string[]

const ReviewForm = () => {
	const [values, setValues] = React.useState<ReviewInputs>()
	const [imagesUrl, setImagesUrl] = React.useState<ImageUrlType>()
	const inputFileRef = React.useRef<HTMLInputElement>(null)

	const navigate = useNavigate()
	const { title } = useParams()
	const isEditing = Boolean(title)

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isValid }
	} = useForm<ReviewInputs>({
		mode: 'onSubmit'
	})

	React.useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { data } = await axios.get(`/api/reviews/${title}`)
				setValues(data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchProduct()
	}, [])

	React.useEffect(() => {
		const setValues = () => {
			if (values) {
				setValue('title', values?.title)
				setValue('desc', values?.desc)
				setValue('text', values?.text)
				setValue('img', values?.img)
				setValue('tags', values?.tags)
				setImagesUrl(values.img)
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
				setImagesUrl(imagesUrl ? [...imagesUrl, data.url] : [data.url])
			}
		} catch (error) {
			console.warn(error)
			alert('Ошибка при загрузке файлов')
		}
	}

	const onClickRemoveImage = (i: number) => {
		const filtedImages = imagesUrl?.filter((elem, index) => index !== i)
		setImagesUrl(filtedImages)
	}

	const onSubmit: SubmitHandler<ReviewInputs> = async data => {
		const reviewData = {
			title: data.title,
			desc: data.desc,
			text: data.text,
			img: imagesUrl,
			tags: data.tags.split(',')
		}

		isEditing
			? await axios.put(`/api/reviews/${values?._id}`, reviewData)
			: await axios.post('/api/reviews', reviewData)
		navigate(`/admin/reviews/`)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Заголовок</h2>
				</div>
				<input
					className={errors.title && 'error'}
					type='text'
					placeholder='Nike..'
					{...register('title', {
						required: true
					})}
				/>
				{errors.title && (
					<div className={styles.form__error}>
						Заголовок указано некорректно
					</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Описание</h2>
				</div>
				<input
					className={errors.desc && 'error'}
					type='text'
					placeholder='Nike..'
					{...register('desc', {
						required: true
					})}
				/>
				{errors.desc && (
					<div className={styles.form__error}>Описание указано некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Текст</h2>
				</div>
				<textarea
					className={errors.text && 'error'}
					placeholder='Очень интересный текст....'
					{...register('text', {
						required: true
					})}
				/>
				{errors.text && (
					<div className={styles.form__error}>Текст указано некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Изображения</h2>
				</div>
				<input
					className={styles.hide}
					ref={inputFileRef}
					type='file'
					onChange={handleChangeFile}
				/>
				<div className={styles.cards}>
					{imagesUrl !== undefined &&
						imagesUrl.map((img, index) => {
							return (
								<div className={styles.card} key={index}>
									<img src={`http://localhost:5000${img}`} alt='' />
									<div
										onClick={() => onClickRemoveImage(index)}
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
							)
						})}
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
				</div>
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Теги</h2>
				</div>
				<input
					className={errors.tags && 'error'}
					type='text'
					placeholder='Nike..'
					{...register('tags', {
						required: true
					})}
				/>
				{errors.tags && (
					<div className={styles.form__error}>Текст указано некорректно</div>
				)}
			</div>
			<button type='submit' className={styles.form__button}>
				{isEditing ? 'Изменить обзор' : 'Добавить обзор'}
			</button>
		</form>
	)
}

export default ReviewForm
