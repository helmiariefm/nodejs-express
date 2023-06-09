const express = require('express')
const app = express()
const port = 3000
const {Pasien} = require('./models')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/pasien-list', async (req, res) => {
    try {
        const data = await Pasien.findAll()
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

app.post('/add-pasien', async (req, res) => {
    try {
        const {name, gender, phone, address} = req.body
        const addPasien = await Pasien.create({name, gender, phone, address})
        
        res.status(201).json(addPasien)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(port, () => console.log(`Running on ${port}`))