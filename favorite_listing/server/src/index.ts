import express from 'express';
import bodyParser from 'body-parser';
import { listings } from './listings';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/listings', (_req, res) => {
	res.send(listings);
});

app.post('/favorite-listing', (req, res) => {
	const id = req.body.id;
	for (const listing of listings) {
		if (listing.id === id) {
			listing.favorited = !listing.favorited;
			return res.send(listing.favorited);
		}
	}
	return res.send('failed to favorite listing');
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);
