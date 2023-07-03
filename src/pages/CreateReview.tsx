import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import { useParams } from 'react-router-dom'
import ReviewForm from '../components/Forms/ReviewForm'

const CreateReview = () => {
	const { title } = useParams()
	const isEditing = Boolean(title)

	return (
		<ContentLayout title={isEditing ? 'Изменить обзор' : 'Создать обзор'}>
			<ReviewForm />
		</ContentLayout>
	)
}

export default CreateReview
