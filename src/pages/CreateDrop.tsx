import React from 'react'
import DropForm from '../components/Forms/DropForm'
import ContentLayout from '../layouts/ContentLayout'
import { useParams } from 'react-router-dom'

const CreateDrop = () => {
	const { title } = useParams()
	const isEditing = Boolean(title)

	return (
		<ContentLayout title={isEditing ? 'Изменить дроп' : 'Создать дроп'}>
			<DropForm />
		</ContentLayout>
	)
}

export default CreateDrop
