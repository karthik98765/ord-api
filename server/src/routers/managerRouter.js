const express = require('express')
const Manager = require('../models/managerModels')

const router = new express.Router()

router.post('/managers', async (req, res) => {
    const manager = new Manager(req.body)

    try {
        await manager.save()
        res.status(201).send(manager)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/managers/login', async (req, res) => {
    try {
        const manager = await Manager.findByCredentials(req.body.email, req.body.password)
        res.send(manager)
    } catch(e) {
        res.status(400).send()
    }
})

router.get('/managers', async (req, res) => {

    try {
        const manager = await Manager.find({})
        res.send(manager)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/managers/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const manager = await Manager.findById(_id)

        if (!manager) {
            return res.status(404).send()
        }

        res.send(manager)
    }catch(e) {
        res.status(500).send()
    }
})

router.patch('/managers/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const manager = await Manager.findById(req.params.id)

        updates.forEach((update) => manager[update] = req.body[update])
        await manager.save()

        if (!manager) {
            return res.status(404).send()
        }

        res.send(manager)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/managers/:id', async (req, res) => {
    try {
        const manager = await Manager.findByIdAndDelete(req.params.id)

        if(!manager) {
            return res.status(404).send()
        }

        res.send(manager)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router