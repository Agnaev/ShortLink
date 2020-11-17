import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const [link, setLink] = useState('');
	const {request} = useHttp();

	const pressHandler = async e => {
		if(e.key === 'Enter') {
			try {
				const data = await request('/api/link/generate', 'POST', {
					from: link
				}, {
					Authorization: 'Bearer ' + auth.token
				});
				history.push(`/detail/${data.link._id}`)
			}
			catch {}
		}
	};

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	return (
		<div className={'row'}>
			<div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
				<div className="input-field">
					<input
						type="text"
						id="link"
						placeholder={'Enter link'}
						onChange={e => setLink(e.target.value)}
						value={link}
						onKeyPress={pressHandler}
					/>
					<label htmlFor={'email'}>Link</label>
				</div>
			</div>
		</div>
	)
};
