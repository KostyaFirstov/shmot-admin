import axios from '../axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ContentLayout from '../layouts/ContentLayout'
import { OrderState } from './Main'
import TimeAgo from 'react-timeago'

const OrderPage = () => {
	const [order, setOrder] = React.useState<OrderState>()
	const { id } = useParams()

	React.useEffect(() => {
		const fetchorder = async () => {
			try {
				const { data } = await axios.get(`/api/orders/${id}`)
				setOrder(data[0])
			} catch (error) {
				console.log(error)
			}
		}

		fetchorder()
	}, [])

	return (
		<ContentLayout title={`Заказ пользователя: ${order?.userName}`}>
			<div className='order'>
				<div className='order__wrapper'>
					{order?.products.map(product => (
						<div className='order__item'>
							<div>Продукт: {product.productId} [ID]</div>
							<span className='order__item-amount'>
								Кол-во: {product.quantity}
							</span>
						</div>
					))}
				</div>
				<div className='order__info'>
					<div className='order__leftside'>
						<div>
							Дата заказа: {order && <TimeAgo date={order.createdAt} />}
						</div>
						<span className='order__status'>Статус: {order?.status}</span>
					</div>
					<div className='order__rightside'>
						<div>Адрес: {order?.address}</div>
						<span className='order__price'>Цена: {order?.price} ₽</span>
					</div>
				</div>
				<Link to={`/admin/orders/${id}/edit`} className='order__button-change'>
					Изменить
				</Link>
			</div>
		</ContentLayout>
	)
}

export default OrderPage
