import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const {loading, error, request, clearError} = useHttp();
	const message = useMessage();
	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		message(error);
		clearError()
	}, [error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const changeHandler = event => {
		setForm({
			...form,
			[event.target.name]: event.target?.value
		});
	};

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {
				email: form.email,
				password: form.password
			});
			message(data.message);
		}
		catch {}
	};

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {
				email: form.email,
				password: form.password
			});
			auth.login(data.token, data.userId)
		}
		catch {}
	};

	return (
		<div className={'row'}>
			<div className="col s6 offset-s3">
				<h1>Short your link</h1>
				<div className={'card blue darken-1'}>
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>
						<div>
							<div className="input-field">
								<input
									placeholder={'Enter the email'}
									id={'email'}
									type={'email'}
									name={'email'}
									className={'yellow-input'}
									value={form.email}
									onChange={changeHandler}
								/>
								<label htmlFor={'email'}>Email</label>
							</div>
							<div className="input-field">
								<input
									placeholder={'Enter the password'}
									id={'password'}
									type={'password'}
									name={'password'}
									className={'yellow-input'}
									value={form.password}
									onChange={changeHandler}
								/>
								<label htmlFor={'password'}>Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className={'btn yellow darken-4'}
							style={{ marginRight: 10 }}
							disabled={loading}
							onClick={loginHandler}
						>Войти</button>
						<button
							className={'btn grey lighten-1'}
							disabled={loading}
							onClick={registerHandler}
						>Регистрация</button>
					</div>
				</div>
			</div>
		</div>
	)
};
