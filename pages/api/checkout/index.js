import Stripe from 'stripe';

const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Your Product Name',
                description: 'Your Product Description',
              },
              unit_amount: 1000, // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://yourdomain.com/success',
        cancel_url: 'https://yourdomain.com/cancel',
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
