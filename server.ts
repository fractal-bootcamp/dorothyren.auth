

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