import React from 'react'
import CategoryForm from '../components/Forms/CategoryForm'
import ContentLayout from '../layouts/ContentLayout'
import { useParams } from 'react-router-dom'

const CreateDrop = () => {
	const { title } = useParams()
	const isEditing = Boolean(title)

	return (
		<ContentLayout
			title={isEditing ? 'Изменить категорию' : 'Создать категорию'}
		>
			<CategoryForm />
		</ContentLayout>
	)
}

export default CreateDrop
