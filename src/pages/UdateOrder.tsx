import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import OrderForm from '../components/Forms/OrderForm'

const UpdateOrder = () => {
	return (
		<ContentLayout title='Изменить заказ'>
			<OrderForm />
		</ContentLayout>
	)
}

export default UpdateOrder
