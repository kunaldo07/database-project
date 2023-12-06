const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();

const PORT = 5005;

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const HeaderSchema = new mongoose.Schema({
    Id: Number,
    Date: String,
    InvoiceNumber: Number,
    CustomerName: String,
    BillingAddress: String,
    ShippingAddress: String,
    GSTIN: String,
    TotalAmount: Number,
});

const ItemsSchema = new mongoose.Schema({
    Id: Number,
    itemName: String,
    Quantity: Number,
    Price: Number,
    Amount: Number,
});

const BillSundrySchema = new mongoose.Schema({
    Id: Number,
    billSundryName: String,
    Amount: Number,
});

app.post('/createBill', (req,res) => {
    try {
        const data = req.body;
        const header = new HeaderSchema({
            data:data,
        });
        await header.save();
    } catch (err) {
        res.json({"cannot create a bill"});
    }
});

app.put('/updateBill', (req,res) => {
    try {
        const data = req.body.Id;
        const header = await HeaderSchema.findOne({
            data
        });
        await header.save();
    } catch (err) {
        res.json({"cannot create a bill"});
    }
});

app.get('/list', (req,res) => {
    try {
        const data = req.body.Id;
        const header = await HeaderSchema.findAll();
        res.json({header});
    } catch (err) {
        res.json({"cannot create a bill"});
    }
});

app.put('/retriveBill', (req,res) => {
    try {
        const data = req.body.Id;
        const header = await HeaderSchema.findOne({
            data
        });
        res.json({header});
    } catch (err) {
        res.json({"cannot create a bill"});
    }
});

app.delete('/deleteBill', (req,res) => {
    try {
        const data = req.body.Id;
        const bill = HeaderSchema.findOne({
            data
        });
        await header.delete(bill);
        res.json("Bill is deleted");
    } catch (err) {
        res.json({"cannot create a bill"});
    }
});



app.listen(post, () => {
    console.log("Server started");
});
