const express = require('express')
const connection = require('./conecction');
const routes = require('./routes/products_routes');
const routes2=require('./routes/categories_routes');

const app = express()
const port = 8000

app.use(express.json());
app.use('/api/v1',routes);
app.use('/api/v1',routes2);


app.get('/', (req, res) => res.send('Starting API STORE TEDW'))
app.listen(port, () => console.log(`START API ON PORT:${port}!`))