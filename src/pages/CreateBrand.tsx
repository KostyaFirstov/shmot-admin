import React from 'react'
import BrandForm from '../components/Forms/BrandForm'
import ContentLayout from '../layouts/ContentLayout'
import { useParams } from 'react-router-dom'

const CreateDrop = () => {
	const { title } = useParams()
	const isEditing = Boolean(title)

	return (
		<ContentLayout title={isEditing ? 'Изменить бренд' : 'Создать бренд'}>
			<BrandForm />
		</ContentLayout>
	)
}

export default CreateDrop
