const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const db = require('../models');
const routes = require('./routes');
const searchRouter = require('./routers/searchRouter');

dotenv.config();

const app = express();

db.sequelize
  .sync()
  .then(() => console.log('DB connected!'))
  .catch(console.error);

app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(routes.search, searchRouter);

app.listen(3020, () => {
  console.log('Listening to port 3020...');
});
