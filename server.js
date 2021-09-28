const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51JeYHHSEH5sbunfA2Qayuopo46s98UH899HZDUxaCMJImbdH2ZH4gP3Qx1AKmsLEH3vNaBn8NKEAnIrkh2WQzjN900MrOGHw1H');
const { v4: uuidv4 } = require('uuid');
const {json} = require('express')

const port = 5005
const app = express();
app.use(cors());
app.use(express.json());

// Route
app.get('/', (req,res)=>{
    res.send('Welcome into shopping website')
});
app.post('/checkout', async(req,res)=>{
    let error, status;
    try {
        const {product, token} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const key = uuidv4();
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'All products description',
            shipping: {
                name: token.card.name,
                address :{
                   
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }


        },{idempotencyKey: key});
        status='success'

    }
    catch(error) {
        console.log("error ====>",error)
        status='error'
    }
    res.json({status: status})
})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is listening on ${port}`)
})
//https://www.youtube.com/watch?v=qrbCF6eMCD0&t=5s