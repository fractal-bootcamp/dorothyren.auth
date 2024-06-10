import client from "./client"
const express = require('express')
const app = express()
const port = 3000

//add middleware that interprets request bodies and forms 
app.use(express.urlencoded({ extended: true }))
//more middleware that interprets json bodies 
app.use(express.json())

const users = [
    {
        email: 'dorothy@dorothy.com',
        password: 'dorothy'
    },
    {
        email: 'sarah@sarah.com',
        password: 'sarah'
    },
]

//when the client sends a get request to the server at the "/" endpoint, the server responds with "Hello World!"
app.get('/', (req, res) => {
    res.send('Hello World!')
})


//LOGIN PAGE
app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html")
})


//we need to get emails and passwords from the request
app.post('/login', (req, res) => {

    //getting these 
    const verifiedEmail = req.body.email
    const verifiedPassword = req.body.password

    console.log(verifiedEmail, verifiedPassword)

    //check to make sure the user is registered
    const verifiedUser = users.find((user) => {
        return user.email === verifiedEmail && user.password === verifiedPassword;
    });
    console.log(verifiedUser)
    //if there's no verified user, then render "fail" and otherwise say "success and show the user"
    if (!verifiedUser) {
        console.log(`log in fail ${verifiedEmail}`)
        res.send("FAIL");
    } else { res.send("Success"); }

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



//sets up the server so that it is always listening on port=port
// if it is listening, return 'example app listening on...'
// otherwise, there will be no message returned 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//this line imports express
const express = require('express')
// app contains express 
const app = express()
// variable that represents the port we are running on
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json())

const users = [
    {
        email: "bill@bill.com",
        password: "bill",
    },
    {
        email: "emma@emma.com",
        password: "emma",
    }
]

//when a client sends a request to the server at the "/" endpoint, the server responds with "hello world!"
app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/login', (req, res) => {
    console.log('received a GET req at login');
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {

    const verifiedEmail = req.body.email
    const verifiedPassword = req.body.password

    const verifiedUser = await users.find((user) => {
        return user.email === verifiedEmail && user.password === verifiedPassword;
    });
    console.log(verifiedUser);

    res.send(JSON.stringify(verifiedUser));


    console.log("POST Request Called")
    // console.log(req.body)
    // console.log(req.body.email)
    // console.log(req.body.password)
    // res.json({ requestBody: req.body })
});



//set up the server so that it is always listening on port = port 
//if it is return "Example app listening on ..."
//otherwise there will be no message returned

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})