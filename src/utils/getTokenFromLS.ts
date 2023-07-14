export const getTokenFromLS = () => {
	const parseData = JSON.parse(localStorage.getItem('persist:root') || '')

	return Boolean(!!parseData.data)
		? JSON.parse(parseData?.data)?.accessToken
		: ''
}
