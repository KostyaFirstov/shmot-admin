import React from 'react'
import ProductForm from '../components/Forms/ProductForm'
import ContentLayout from '../layouts/ContentLayout'

const AddProduct = () => {
	return (
		<ContentLayout title='Создать товар'>
			<ProductForm />
		</ContentLayout>
	)
}

export default AddProduct
