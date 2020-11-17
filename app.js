const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(
	express.json({
		extended: true
	})
);
app.get('/', (req, res) => {
	res.json({
		message: 'Hello world'
	})
});
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

const PORT = config.get('port') || 5000;

(async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		await app.listen(PORT, () => {
			console.log(`App has been started at localhost:${PORT}`)
		})
	}
	catch(exc) {
		console.log('Server error', exc.message);
		process.exit(1);
	}
})();

