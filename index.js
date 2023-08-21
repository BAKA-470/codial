const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo'); // To store the session in database
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: "extended",
    prefix: "/css"

}));




app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('./assets'));
// making the uploads path available for the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayout);

// Extract Style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    secret: 'secretkey12345679', // Change this to your
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 100 },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codial_development',
        autoRemove: 'disabled',
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));


app.listen(port, function(err) {
    if (err) {
        console.log("Error in running the server:", err);
    }
    console.log(`Server is running on port: ${port}`);
});