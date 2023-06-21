import { useParams } from 'react-router-dom'
import axios from '../axios'
import React from 'react'
import { ProductParams } from '../redux/slices/products'

const ProductPage = () => {
	const [product, setProduct] = React.useState<ProductParams>()
	const params = useParams()

	React.useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { data } = await axios.get(`/api/products/${params.title}`)
				setProduct(data[0])
			} catch (error) {
				console.log(error)
			}
		}

		fetchProduct()
	}, [])
	console.log(product)

	if (product) {
		return <div>{product.brand}</div>
	} else {
		return <>Loading</>
	}
}

export default ProductPage
