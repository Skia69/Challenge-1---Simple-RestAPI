import express from 'express';
import bodyParser from 'body-parser';
import { listings } from './listings';
import { bookings, Booking } from './bookings';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/listings', (_req, res) => {
	res.send(listings);
});

app.get('/bookings', (_req, res) => {
	res.send(bookings);
});

app.post('/create-booking', (req, res) => {
	const id: string = req.body.id;
	const timestamp: string = new Date().toLocaleString();

	for (const listing of listings) {
		if (listing.id === id) {
			const createdBooking: Booking = {
				id: Date.now().toString(),
				title: listing.title,
				image: listing.image,
				address: listing.address,
				timestamp
			};
			bookings.push(createdBooking);
			listing.bookings.push(createdBooking.id);

			return res.send(bookings);
		}
	}
	return res.send('failed to create booking');
});

app.post('/delete-listing', (req, res) => {
	const id: string = req.body.id;
	for (let i = 0; i < listings.length; i++) {
		if (listings[i].id === id) {
			const result = listings.splice(i, 1);
			return res.send(result);
		}
	}
	return res.send('failed to delete listing');
});

app.put('/update-listing', (req, res) => {
	const id: string = req.body.id;
	const price: number = req.body.price;
	for (const listing of listings) {
		if (listing.id === id) {
			listing.price = price;
			return res.sendStatus(200).send(listing.price);
		}
	}
	return res.send('failed to update listing');
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);
