const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;
const fs = require('fs');

let apiRoutes = require("./routes");



app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
function getRand() {
  const obj = [
    {name: 'Terry'},
    {age: '20'},
    {city: 'Saint-Petersburg'}
  ]
  return obj[Math.floor(Math.random() * obj.length)]
}

//connect to mongoose
const dbPath = 'mongodb://localhost/base';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})


app.get('/', (req, res) => {
  res.send(getRand())
});


app.use('/api', apiRoutes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

