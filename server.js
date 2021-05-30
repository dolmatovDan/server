const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;
const fs = require('fs');

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




app.get('/', (req, res) => {
  res.send(getRand())
});

app.post('/', (req, res) => {
  res.send(req.body);
  console.log(req.body);
  fs.writeFile('users.json', JSON.stringify(req.body), 'utf8', () => {
    console.log('done');
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

