//on every express app, need to pass middleware

//res.something modifies the response before it gets sent off
//add cookies to remember when users are authed
//create a database to track rather than using random isAuthed
//npx prisma init

import express from 'express';
import { truncate } from 'fs';

const app = express()
const cookieParaser = require('cookie-parser');

app.get('/', (req, res) => {
    res.send('Hello World!')
)


app.listen(
    3000,
    () => console.log('server is running on http://localhost:3000')
)

async function login(email: string, password: string) {
    //need a database
    // login takes email and password

    const user = await client.user.findUnique({
        where: {
            email: email,
            password: password
        }
    })

    if (!user) return null

    const isPasswordCorrect = user.password === password

    if (user && isPasswordCorrect) return user
    //compare password 

    if (password === "the correct password" {
        return { id: 1, email: email, password: "thecorrectpassword " }
    }
    else {
        return null
    })
}

async function isAuthed(req: Request) {
    const userId = req.cookies.userId
    if (userId) {
        //does that user exist in the database? 
        //if it does, then they are authed
        if (users.find(user => user.id === req.cookies.userId))    }
    return false
}

//login page
app.get('/login', (req, res) => { })

//check if the user is already logged in. if they are, then send them to the dashboard.
if (isAuthed(req)

    //if not, send them to the login page 

    // login METHOD
    app.post('/login',))

if (!user) {
    res.send('login failed');
}
if (user) {
    res.send('Logged into the dashboard!')
}

//signup page

app.get('/signup', async (req, res) => {
    const isLoggedIn = await isAuthed(req)
    if (isLoggedIn) res.sendFile(__dirname + '/dashboard.html');

    res.sendFile(__dirname + '/signup.html')
})

app.post('/signup')

//1. get the sign up details
//2. try to log in with those signup details to check if theyre valid
//3. if user exists, redirect them
//4. if not, create user and log them in (give them a session)
//(protected) dashboard page