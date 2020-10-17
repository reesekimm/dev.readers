const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const db = require('../models');
const routes = require('./routes');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter');
const reviewsRouter = require('./routers/reviewsRouter');
const searchRouter = require('./routers/searchRouter');

const passportConfig = require('./passport');

dotenv.config();

const app = express();

/** Sync all defined models to the DB. */
db.sequelize
  .sync()
  .then(() => console.log('✅ DB connected!'))
  .catch(console.error);

const sessionStore = new SequelizeStore({ db: db.sequelize });

passportConfig();

app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('*', (req, res, next) => {
  console.log('===== app.js =====');
  console.log('session info : ', req.session);
  next();
});

app.use(routes.user, userRouter);
app.use(routes.review, reviewRouter);
app.use(routes.reviews, reviewsRouter);
app.use(routes.search, searchRouter);

app.listen(3020, () => {
  console.log('Listening to port 3020...');
});
