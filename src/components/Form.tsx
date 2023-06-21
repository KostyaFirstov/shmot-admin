import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
	title: string
	desc: string
	img: string
	categories: string[]
	sizes: string[]
	color: string
	brand: string
	price: number
	gender: string
	amount: number
	popular: number
}

const Form = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid }
	} = useForm<Inputs>({
		mode: 'onSubmit'
	})

	const onSubmit: SubmitHandler<Inputs> = async data => {
		const productData = {
			title: data.title,
			desc: data.desc,
			img: data.img,
			categories: data.categories,
			sizes: data.sizes,
			color: data.color,
			brand: data.brand,
			price: data.price,
			gender: data.gender,
			amount: data.amount,
			popular: data.popular
		}
	}

	return (
		<form className='form' onSubmit={handleSubmit(onSubmit)}>
			<div className='form__input'>
				<input
					className={errors.title && 'error'}
					type='text'
					placeholder='Название'
					{...register('title', {
						required: true
					})}
				/>
				{errors.title && (
					<div className='form__error'>Название указано некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<textarea
					className={errors.desc && 'error'}
					placeholder='Описание'
					{...register('desc', {
						required: true
					})}
				/>
				{errors.title && (
					<div className='form__error'>Описание указано некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='file'
					className={errors.img && 'error'}
					placeholder='Описание'
					{...register('img', {
						required: true
					})}
				/>
				{errors.img && (
					<div className='form__error'>Изображение указано некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='text'
					className={errors.categories && 'error'}
					placeholder='Категории'
					{...register('categories', {
						required: true
					})}
				/>
				{errors.categories && (
					<div className='form__error'>Категории указаны некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='text'
					className={errors.sizes && 'error'}
					placeholder='Размеры'
					{...register('desc', {
						required: true
					})}
				/>
				{errors.sizes && (
					<div className='form__error'>Размеры указаны некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='text'
					className={errors.color && 'error'}
					placeholder='Цвет'
					{...register('desc', {
						required: true
					})}
				/>
				{errors.color && (
					<div className='form__error'>Цвет указан некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='text'
					className={errors.brand && 'error'}
					placeholder='Бренд'
					{...register('desc', {
						required: true
					})}
				/>
				{errors.brand && (
					<div className='form__error'>Бренд указан некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='number'
					className={errors.price && 'error'}
					placeholder='Цена'
					{...register('price', {
						required: true
					})}
				/>
				{errors.price && (
					<div className='form__error'>Цена указана некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='number'
					className={errors.gender && 'error'}
					placeholder='Пол'
					{...register('gender', {
						required: true
					})}
				/>
				{errors.gender && (
					<div className='form__error'>Пол указан некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='number'
					className={errors.amount && 'error'}
					placeholder='Количество'
					{...register('amount', {
						required: true
					})}
				/>
				{errors.amount && (
					<div className='form__error'>Количество указан некорректно</div>
				)}
			</div>
			<div className='form__input'>
				<input
					type='number'
					className={errors.popular && 'error'}
					placeholder='Популярность 0 - 100'
					{...register('popular', {
						required: true
					})}
				/>
				{errors.popular && (
					<div className='form__error'>Популярность указана некорректно</div>
				)}
			</div>
			<button type='submit' className='form__button button button-black'>
				Добавить товар
			</button>
		</form>
	)
}

export default Form
