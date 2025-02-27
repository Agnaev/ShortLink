const {Router} = require('express');
const Link = require('../Models/Link');

const router = Router();

router.get('/:code', async(req, res) => {
	try {
		const link = await Link.findOne({
			code: req.params.code
		});

		if(link) {
			link.clicks++;
			await link.save();
			return res.redirect(link.from);
		}

		await res.status(404).json('Link not found')
	} catch {
		await res.status(500).json({
			message: 'Something went wrong'
		})
	}
});

module.exports = router;
