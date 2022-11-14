const express = require('express')
const connection = require('./conecction');
const routes = require('./routes/products_routes');
const user_routes = require('./routes/user_routes');
const auth_jwt = require('./auth/jwt');
const routes2 = require('./routes/categories_routes');
const cors = require('cors');

const app = express()

const port = 8000
//const port = process.env.port;
//const api_route = process.env.api_route;
let corsOptions = {
    origin : ['http://192.168.3.4:3000'],
 }

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/v1',routes);
app.use('/api/v1',routes2);
//auth
//app.use(auth_jwt());
app.use('/api/v1',user_routes);



app.get('/', (req, res) => res.send('Starting API STORE TEDW'))
app.listen(port, () => console.log(`START API ON PORT:${port}!`))