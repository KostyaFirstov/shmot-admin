import React from 'react'
import ProductForm from '../components/Forms/ProductForm'
import ContentLayout from '../layouts/ContentLayout'
import { useParams } from 'react-router-dom'

const AddProduct = () => {
	const { title } = useParams()
	const isEditing = Boolean(title)

	return (
		<ContentLayout title={isEditing ? 'Изменить товар' : 'Создать товар'}>
			<ProductForm />
		</ContentLayout>
	)
}

export default AddProduct
