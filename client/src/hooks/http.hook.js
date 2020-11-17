import {useState, useCallback} from 'react';

export const useHttp = () => {
	const [loading, serLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		serLoading(true);
		if(typeof body === 'object' && body !== null) {
			body = JSON.stringify(body)
		}
		headers['Content-Type'] = 'application/json';
		try {
			const response = await fetch(url, {
				method,
				body,
				headers
			});
			const data = await response.json();
			if (response.ok) {
				return data;
			}
			throw new Error(data.message || 'Something went wrong.')
		}
		catch(exc) {
			setError(exc.message);
			throw exc;
		}
		finally {
			serLoading(false);
		}
	}, []);

	const clearError = useCallback(() => setError(null), []);

	return {
		loading,
		request,
		error,
		clearError
	}
};
