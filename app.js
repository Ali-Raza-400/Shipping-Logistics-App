const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler =require('./helpers/error-handler')


// middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler)

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');


const api = process.env.API_URL;
// Routers
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log('connection successful'))
  .catch((err) => {
    console.log(err);
  });

// app.listen(3000, () => {
//   // console.log(api);
//   console.log('server running at port');
// });


// server

var server =app.listen(process.env.PORT || 3000, function(){
  var port=server.address().port;
  console.log("Express is working on port"+port)
})
