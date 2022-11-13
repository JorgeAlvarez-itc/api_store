const express = require('express')
const connection = require('./conecction');
const routes = require('./routes/products_routes');

const app = express()
const port = 3000

app.use(express.json());
app.use('/api/v1',routes);


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))