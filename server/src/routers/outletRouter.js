const express = require('express')
const Outlet = require('../models/outletModels')

const router = new express.Router()

router.post('/outlets', async (req, res) => {
    const outlet = new Outlet(req.body)

    try {
        await outlet.save()
        res.status(201).send(outlet)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/outlets', async (req, res) => {

    try {
        const outlets = await Outlet.find({})
        res.send(outlets)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/outlets/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const outlet = await Outlet.findById(_id)

        if (!outlet) {
            return res.status(404).send()
        }

        res.send(outlet)
    }catch(e) {
        res.status(500).send()
    }
})

router.patch('/outlets/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'phoneno', 'address']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
       return res.status(400).send({ error: 'Invalid updates'}) 
    }

    try {
        const outlet = await Outlet.findById(req.params.id)

        updates.forEach((update) => outlet[update] = req.body[update])
        await outlet.save()

        if(!outlet) {
            return res.status(404).send()
        }

        res.send(outlet)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/outlets/:id', async (req, res) => {
    try {
        const outlet = await Outlet.findByIdAndDelete(req.params.id)

        if(!outlet) {
            return res.status(404).send()
        }

        res.send(outlet)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router