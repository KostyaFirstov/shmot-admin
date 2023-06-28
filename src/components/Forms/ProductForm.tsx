import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from '../../axios'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Form.module.scss'
import { useAppDispatch } from '../../redux/store'
import { fetchCategories, selectFilters } from '../../redux/slices/filters'
import { useSelector } from 'react-redux'

export type ProductInputs = {
	_id: number
	title: string
	desc: string
	text: string
	img?: string[]
	categories: string[]
	sizes: string[]
	color: string
	brand: string
	price: number
	gender: string
	amount: number
	popular: number
}

type ImageUrlType = string[]

const ProductForm = () => {
	const [values, setValues] = React.useState<ProductInputs>()
	const [imagesUrl, setImagesUrl] = React.useState<ImageUrlType>()
	const inputFileRef = React.useRef<HTMLInputElement>(null)

	const navigate = useNavigate()
	const { title } = useParams()
	const { categories } = useSelector(selectFilters)
	const appDispatch = useAppDispatch()

	const isEditing = Boolean(title)

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isValid }
	} = useForm<ProductInputs>({
		mode: 'onSubmit'
	})

	React.useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { data } = await axios.get(`/api/products/${title}`)
				setValues(data[0])
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
				setValue('popular', values?.popular)
				setValue('price', values?.price)
				setValue('amount', values?.amount)
				setValue('brand', values?.brand)
				setValue('categories', values?.categories)
				setValue('color', values?.color)
				setValue('sizes', values?.sizes)
				setValue('gender', values?.gender)
				setImagesUrl(values.img)
			}
		}

		setValues()
	}, [values])

	// React.useEffect(() => {
	// 	const setImages = async () => {
	// 		const formData = new FormData()
	// 		if (values?.img && values?.img.length > 0) {
	// 			const file = values.img[0]
	// 			console.log(file)
	// 			console.log(formData.append('image', file)
	// 			const { data } = await axios.post('/upload', formData)
	// 			setImagesUrl(imagesUrl ? [...imagesUrl, data.url] : [data.url])
	// 		}
	// 	}

	// 	setImages()
	// }, [values])

	React.useEffect(() => {
		appDispatch(fetchCategories())
	}, [])

	const handleChangeFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const formData = new FormData()
			if (event.target.files) {
				console.log(event.target.files[0])
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

	const onSubmit: SubmitHandler<ProductInputs> = async data => {
		const productData = {
			title: data.title,
			desc: data.desc,
			text: data.text,
			img: imagesUrl,
			categories: data.categories,
			sizes: data.sizes,
			color: data.color,
			brand: data.brand,
			price: data.price,
			gender: data.gender,
			amount: data.amount,
			popular: data.popular
		}

		isEditing
			? await axios.put(`/api/products/${values?._id}`, productData)
			: await axios.post('/api/products', productData)
		navigate(`/admin/products/`)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Название</h2>
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
					<div className={styles.form__error}>Название указано некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Описание</h2>
				</div>
				<input
					className={errors.desc && 'error'}
					placeholder='Этот товар....'
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
					<div className={styles.form__error}>Текст указан некорректно</div>
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
												stroke-width='2'
												stroke-linecap='round'
												stroke-linejoin='round'
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
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M1 23.9417L8.51256 16.366C9.19598 15.6768 10.304 15.6768 10.9874 16.366L16.75 22.177M16.75 22.177L21.6376 17.2483C22.321 16.5592 23.429 16.5592 24.1124 17.2483L29 22.177M16.75 22.177L20.6875 26.1476'
								stroke='#23CFC9'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M25.5 9.82358V1M25.5 1L22 4.52943M25.5 1L29 4.52943'
								stroke='#23CFC9'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					</div>
				</div>
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Категории</h2>
				</div>
				<input
					type='text'
					className={errors.categories && 'error'}
					placeholder='Категории'
					{...register('categories', {
						required: true
					})}
				/>
				{categories.length > 0 ? (
					categories.map((category, index) => (
						<div key={index}>{category.name}</div>
					))
				) : (
					<div>Категорий не найдено</div>
				)}
				{errors.categories && (
					<div className={styles.form__error}>
						Категории указаны некорректно
					</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Размеры</h2>
				</div>
				<input
					type='text'
					className={errors.sizes && 'error'}
					placeholder='39, 41'
					{...register('sizes', {
						required: true
					})}
				/>
				{errors.sizes && (
					<div className={styles.form__error}>Размеры указаны некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Цвет</h2>
				</div>
				<input
					type='text'
					className={errors.color && 'error'}
					placeholder='Черный..'
					{...register('color', {
						required: true
					})}
				/>
				{errors.color && (
					<div className={styles.form__error}>Цвет указан некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Бренд</h2>
				</div>
				<input
					type='text'
					className={errors.brand && 'error'}
					placeholder='Бренд'
					{...register('brand', {
						required: true
					})}
				/>
				{errors.brand && (
					<div className={styles.form__error}>Бренд указан некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Пол</h2>
				</div>
				<div className={styles.form__inputInner}>
					<div className={styles.form__checkbox}>
						<input
							type='radio'
							className={errors.gender && 'error'}
							placeholder='Пол'
							id='men'
							value='men'
							{...register('gender', {
								required: true
							})}
						/>
						<label htmlFor='men'>Мужской</label>
					</div>
					<div className={styles.form__checkbox}>
						<input
							type='radio'
							className={errors.gender && 'error'}
							placeholder='Пол'
							id='women'
							value='women'
							{...register('gender', {
								required: true
							})}
						/>
						<label htmlFor='women'>Женский</label>
					</div>
					<div className={styles.form__checkbox}>
						<input
							type='radio'
							className={errors.gender && 'error'}
							placeholder='Пол'
							id='unisex'
							value='unisex'
							{...register('gender', {
								required: true
							})}
						/>
						<label htmlFor='unisex'>Унисекс</label>
					</div>
				</div>
				{errors.gender && (
					<div className={styles.form__error}>Пол указан некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Цена</h2>
				</div>
				<input
					type='number'
					className={errors.price && 'error'}
					placeholder='3000'
					{...register('price', {
						required: true
					})}
				/>
				{errors.price && (
					<div className={styles.form__error}>Цена указана некорректно</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Количество</h2>
				</div>
				<input
					type='number'
					className={errors.amount && 'error'}
					placeholder='10..'
					{...register('amount', {
						required: true
					})}
				/>
				{errors.amount && (
					<div className={styles.form__error}>
						Количество указан некорректно
					</div>
				)}
			</div>
			<div className={styles.form__input}>
				<div className={styles.form__title}>
					<h2>Популярность</h2>
				</div>
				<input
					type='number'
					className={errors.popular && 'error'}
					placeholder='0 - 100'
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
				Добавить товар
			</button>
		</form>
	)
}

export default ProductForm
