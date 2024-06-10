import { Request } from "express";
import client from "./client"
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//add middleware that interprets request bodies and forms 
app.use(express.urlencoded({ extended: true }))
//more middleware that interprets json bodies 
app.use(express.json())


//when the client sends a get request to the server at the "/" endpoint, the server responds with "Hello World!"
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//IsAuthed function 
async function isAuthed(req: Request) {
    const userId = req.cookies.userId
    console.log("MY COOKIES ARE: ", req.cookies, "MY ID IS: ", userId)
    if (userId) {
        //does that user exist in the database? 
        const user = await client.user.findUnique({
            where: {
                id: userId
            }
        })
        //if it does, then they are authed
        if (user) return true
    }
    return false
}


//LOGIN PAGE
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html")
})


//we need to get emails and passwords from the request
app.post('/login', async (req, res) => {

    //getting these 
    const email = req.body.email
    const password = req.body.password
    const user = await client.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) return res.redirect('/signup')

    const isPasswordCorrect = user.password === password

    // users is the persisted "array" or list of users
    // Currently this is an array above, but you could swap for the database model

    //if there's no verified user, then render "fail" and otherwise say "success and show the user"
    if (!isPasswordCorrect) {
        console.log(`log in fail ${email}`)
        res.redirect("/login");
    } else {
        res.cookie('userId', user.id, { httpOnly: true })
        res.redirect("/dashboard");
    }

})

//SIGN UP PAGE

//create the sign up page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})
//we need to collect emails and passwords from the sign up page using a POST request
app.post('/signup', async (req, res) => {
    const newEmail = req.body.email
    const newPassword = req.body.password

    //
    const newUser = await client.user.create({
        data: {
            email: newEmail,
            password: newPassword,
        }
    })
    console.log(newUser)
    res.redirect('/login')
})


//DASHBOARD PAGE
app.get('/dashboard', async (req, res) => {
    const _isAuthed = await isAuthed(req)
    if (_isAuthed) return res.sendFile(__dirname + "/dashboard.html")
    return res.redirect("/login")
})


//sets up the server so that it is always listening on port=port
// if it is listening, return 'example app listening on...'
// otherwise, there will be no message returned 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
