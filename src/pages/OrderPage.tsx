import axios from '../axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import ContentLayout from '../layouts/ContentLayout'
import { OrderState } from './Main'
import TimeAgo from 'react-timeago'

const OrderPage = () => {
	const [order, setOrder] = React.useState<OrderState>()
	const params = useParams()

	React.useEffect(() => {
		const fetchorder = async () => {
			try {
				const { data } = await axios.get(`/api/orders/${params.id}`)
				setOrder(data[0])
			} catch (error) {
				console.log(error)
			}
		}

		fetchorder()
	}, [])

	return (
		<ContentLayout title={`Заказ пользователя: ${order?.userName}`}>
			<div>
				{order?.products.map(product => (
					<>
						<div>Продукт: {product.productId} [ID]</div>
						<div>Кол-во: {product.quantity}</div>
					</>
				))}
				<div>Дата заказа: {order && <TimeAgo date={order.createdAt} />}</div>
				<div>Статус: {order?.status}</div>
				<div>Цена: {order?.price} ₽</div>
				<div>Адрес: {order?.address}</div>
			</div>
		</ContentLayout>
	)
}

export default OrderPage
