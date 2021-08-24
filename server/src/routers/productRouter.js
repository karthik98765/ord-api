const express = require('express')
const { update } = require('../models/productModels')
const Product = require('../models/productModels')

const router = new express.Router()

router.post('/products', async (req, res) => {
    const product = new Product(req.body)

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/products', async (req, res) => {

    try {
        const products = await Product.find({})
        res.send(products)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/products/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const product = await Product.findById(_id)

        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/products/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'cost']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
       return res.status(400).send({ error: 'Invalid updates'}) 
    }

    try {
        const product = await Product.findById(req.params.id)

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()

        if(!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if(!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router