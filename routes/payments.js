import express, { json } from 'express';
const router = express.Router();
import Razorpay from 'razorpay';
import cors from 'cors'
import bodyParser from 'body-parser'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

let paymentLinkId


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rohithssiddeshwara@gmail.com',
      pass: 'ppvz ojhr apmh xojj'
    }
  });

var mailOptions = {
    from: 'rohithssiddeshwara@gmail.com',
    to: 'rohansiddeshwara@gmail.com',
    subject: 'Payment of 5 rupees sent',
    text: 'That was easy!'
};


router.use(bodyParser.json())

// All routes here start with /v1
router.post('/v1/payment_links', async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_A8OqdWUqvjbhwl',
            key_secret: 'oTkrNMazWcA6aBNbsWJ0vjUc'
        });

        const paymentLink = await instance.paymentLink.create({
            amount: 500,
            currency: 'INR',
            accept_partial: true,
            first_min_partial_amount: 500,
            description: 'For XYZ purpose',
            customer: {
                name: 'rohith',
                email: 'rohithssiddeshwara@gmail.com',
                contact: '+918197134639'
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            notes: {
                policy_name: 'Jeevan Bima'
            },
            callback_url: 'https://example-callback-url.com/',
            callback_method: 'get'
        });

        // Send the created payment link back to the client
        
        paymentLinkId = paymentLink.id
        res.json({paymentLinkId})
        
    } catch (error) {
        // If there's an error, send an error response back to the client
        console.error('Error creating payment link:', error);
        res.status(500).json({ error: 'Failed to create payment link' });
    }

    
    
});


router.post('/verification', (req,res)=>{
    
    const secret = '1234567890'

	// console.log(req.body.payload)

	

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	// console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
        console.log(req.body.payload.order.entity.status)
        
       
		//process it
        if(req.body.payload.order.entity.status === 'paid'){

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

        }
		
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})



export {router as paymentRoutes, paymentLinkId};
