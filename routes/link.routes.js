const {Router} = require('express');
const shortId = require('shortid');
const config = require('config');

const Link = require('../Models/Link');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', auth, async (req, res) => {
	try {
		const baseUrl = config.get('baseUrl');
		const {from} = req.body;
		const code = shortId.generate();

		const exist = await Link.findOne({ from });
		if(exist) {
			return res.json({
				link: exist
			})
		}
		const to = baseUrl + '/t/' + code;

		const link = new Link({
			code,
			to,
			from,
			owner: req.user.userId
		});
		await link.save();
		await res.status(201).json({
			link
		})
	} catch (exc) {
		res.status(500).json({
			message: 'Something went wrong'
		})
	}
});

router.get('/', auth, async (req, res) => {
	try {
		const links = await Link.find({
			owner: req.user.userId
		});
		await res.json(links);
	} catch (exc) {
		res.status(500).json({
			message: 'Something went wrong'
		})
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const link = await Link.findById(req.params.id);
		await res.json(link)
	} catch (exc) {
		res.status(500).json({
			message: 'Something went wrong'
		})
	}
});

module.exports = router;
