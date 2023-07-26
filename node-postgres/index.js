const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./queries');
const app = express();
//app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.get('/', (req, res) => {
  res.json({ info: 'Server Running' })
});

app.get('/users', db.getUserById)
app.get('/check', db.checkUser)
app.get('/checkPass', db.checkPass)
app.post('/createAcc', db.createAcc)
app.put('/updateScore', db.updateScore);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));