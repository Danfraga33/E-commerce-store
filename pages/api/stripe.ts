// import Stripe from 'stripe';
// import stripeInit from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error('Missing Stripe environment variables');
}

// const stripe = new stripeInit(process.env.STRIPE_SECRET_KEY);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		console.log(req.body);
		try {
			const params = {
				submit_type: 'pay',
				mode: 'payment',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_options: [
					{
						shipping_rate: 'shr_1OLo6TJF4okf9JwF3JO14h3i',
					},
					{
						shipping_rate: 'shr_1OLo7pJF4okf9JwFWaQVz2Cn',
					},
				],
				line_items: req.body.map((item) => {
					const img = item.image[0].asset._ref;
					const newImage = img
						.replace(
							'image-',
							'https://cdn.sanity.io/images/09dg4a19/production/'
						)
						.replace('-webp', 'webp');
					console.log('IMAGE', newImage);
					return {
						price_data: {
							currency: 'usd',
							product_data: {
								name: 'item.name',
								images: [newImage],
							},
							unit_amount: item.price * 100,
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1,
						},
						quantity: item.quantity,
					};
				}),

				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/cancel`,
			};

			const session = await stripe.checkout.sessions.create(params);
			res.status(200).json(session);
			// Create Checkout Sessions from body params.
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
