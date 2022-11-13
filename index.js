const express = require('express')
const connection = require('./conecction');
const routes = require('./routes/products_routes');
const user_routes = require('./routes/user_routes');
const auth_jwt = require('./auth/jwt');

const app = express()
const port = process.env.port;
//const api_route = process.env.api_route;

app.use(express.json());
app.use('/api/v1',routes);
//auth
//app.use(auth_jwt());
app.use('/api/v1',user_routes);


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))