export const getTokenFromLS = () => {
	const parseData = JSON.parse(localStorage.getItem('persist:root') || '')

	return Boolean(parseData.data === null)
		? ''
		: JSON.parse(parseData?.data)?.accessToken
}
