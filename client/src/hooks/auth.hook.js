import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [ready, setReady] = useState(false);

	const login = useCallback((jwtToken, _userId) => {
		setToken(jwtToken);
		setUserId(_userId);

		localStorage.setItem(storageName, JSON.stringify({
			userId: _userId,
			token: jwtToken
		}))
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);

		localStorage.removeItem(storageName);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		if(data && 'token' in data) {
			login(data.token, data.userId)
		}
		setReady(true);
	}, [login]);

	return {
		login,
		logout,
		token,
		userId,
		ready,
		storageName
	}
};
