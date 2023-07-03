import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import UserForm from '../components/Forms/UserForm'
import { useParams } from 'react-router-dom'

const CreateUser = () => {
	const { id } = useParams()
	const isEditing = Boolean(id)

	return (
		<ContentLayout title={`${isEditing ? 'Изменить' : 'Создать'} пользователя`}>
			<UserForm />
		</ContentLayout>
	)
}

export default CreateUser
