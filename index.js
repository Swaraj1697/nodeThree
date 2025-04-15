const { time } = require('console');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

// const loggermiddleware = (req, res, next) => {
//     console.log(`Request Method: ${req.method}`);
//     console.log(`Request URL: ${req.url}`);
//     next();

// }

// app.get('/data', (req, res) => {
//     res.send('Data received!');
// });

// app.use(loggermiddleware);

// mongoose.connect(dbURL)
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.error('MongoDB connection error:', err));


app.post('/api/products', async (req, res) => {
    const body = req.body;
    const product = await ProductModel.create({
        product_name: body.product_name,
        product_price: body.product_price,
        inStock: body.inStock,
        category: body.category,
    });
    console.log(product);
    res.status(201).json({
        success: true,
        data: product,
    });
})

app.get("/api/product/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
})

app.put('/api/product/:productId', async (req, res) => {
    const productId = req.params.productId;

    await ProductModel.findByIdAndUpdate(productId, req.body);
    res.status(201).json({
        success: true,
        message: 'Product updated successfully',
    });
})

app.delete('/api/product/:productId', async (req, res) => {
    const productId = req.params.productId;

    await ProductModel.findByIdAndDelete(productId);
    res.status(201).json({
        success: true,
        message: 'Product deleted successfully',
    });
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});