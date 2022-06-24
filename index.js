'use strict';

require('dotenv').config();

const path = require('path');
const express = require('experess');
const passport = require('passport');
const { Strategy } = require('passport-twitter');
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, SESSION_SECRET } =  process.env;
const port = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');

passport.use(new Strategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: '/return'
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);



app.listen(port);
