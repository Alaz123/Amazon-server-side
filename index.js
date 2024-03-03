const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Success !",
	});
});

app.post("/payment/create", async (req, res) => {
	const total = req.query.total;

	if (total > 0) {
		// console.log("payment received", total);

		// res.send(total);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: "usd",
		});

		// console.log(paymentIntent);
		// res.status(201).json(paymentIntent);

		res.status(201).json({
			clientSecret: paymentIntent.client_secret,
		});
	} else {
		res.status(403).json({
			message: "Total must be greater than 0",
		});
	}
});

app.listen(8999, (err) => {
	if (err) throw err;
	console.log("amazon server is running on port 8999 , http://localhost:8999");
});
