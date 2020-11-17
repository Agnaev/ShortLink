const { Router } = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const router = Router();

router.post(
	'/register',
	[
		check('email', 'Incorrect email').isEmail(),
		check('password', 'Incorrect password')
			.isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if(!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Incorrect data at registration'
				});
			}

			const {email, password} = req.body;

			const candidate = await User.findOne({ email });
			if(candidate) {
				return res.status(400).json({
					message: 'User already exist'
				})
			}
			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User({
				email: email.toLowerCase(),
				password: hashedPassword
			});
			await user.save();

			res.status(201).json({
				message: 'User created'
			})
		}
		catch(exc) {
			res.status(500).json({
				message: 'Register failed'
			})
		}
	}
);

router.post(
	'/login',
	[
		check('email', 'Введите корректный email').normalizeEmail().isEmail(),
		check('password', 'Введите пароль').exists()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректный данные при входе в систему'
				})
			}

			const {email, password} = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: 'Пользователь не найден' })
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
			}

			const token = jwt.sign(
				{ userId: user.id },
				config.get('jwt_access_key'),
				{ expiresIn: '1h' }
			);

			await res.json({ token, userId: user.id })

		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
		}
	}
);

router.post('/verify', (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, config.get('jwt_access_key'));
		res.json({
			isAuth: true
		});
	}
	catch {
		res.json({
			isAuth: false
		})
	}
});

module.exports = router;
