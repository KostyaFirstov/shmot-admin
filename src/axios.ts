import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		token: `Bearer ${
			JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '')?.data)
				?.accessToken
		}`
	}
})

export default instance
