import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODMzODRkYjY5MzlkMGM0OTMzNmE2OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NzM1NDgxNCwiZXhwIjoxNjg5OTQ2ODE0fQ.oszK9D2HK7f1KuxL92EHxskBkT4u7kK21ZxTqFzN2vY`
	}
})

export default instance
