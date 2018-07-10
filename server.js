const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())


const PORT = 3485
const database = {
    users: [
        {
            id: '001',
            name: 'user1',
            email: '001@test.com',
            password: '001',
            entries: 0,
            joined: new Date()
        },
        {
            id: '002',
            name: 'user2',
            email: '002@test.com',
            password: '002',
            entries: 0,
            joined: new Date()
        },
        {
            id: '999',
            name: '賤蕩八方',
            email: '999@test.com',
            password: '999',
            entries: 999,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0])
        } else {
            res.json("FAILED")
        }
    
})


app.post('/register', (req, res) => {
    const {email, name, password} = req.body
    database.users.push({
        id: '003',
        entries: 0,
        joined: new Date(),
        name, email, password
    })
    const newUser = {...database.users[database.users.length-1]}
    delete newUser.password
    res.json(newUser)
})


app.get('/profile/:id', (req,res) => {
    const {id} = req.params
    const user = database.users.find(user => user.id === id)

    if(user){
        res.json(user)
    }else{
        res.status(404).json('user not found')
    }
})


app.put('/image', (req, res) => {
    const {id} = req.body
    let founded = false
    database.users.forEach(user => {
        if(user.id === id) {
            founded = true
            user.entries++
            return res.json(user.entries)
        }        
    })

    if(!founded)
        res.status(404).json('user not found')    
})


app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})