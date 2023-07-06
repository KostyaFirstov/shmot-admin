import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import { useParams } from 'react-router-dom'
import RequestForm from '../components/Forms/RequestForm'

const CreateRequest = () => {
	const { id } = useParams()
	const isEditing = Boolean(id)

	return (
		<ContentLayout title={isEditing ? 'Изменить запрос' : 'Добавить запрос'}>
			<RequestForm />
		</ContentLayout>
	)
}

export default CreateRequest
