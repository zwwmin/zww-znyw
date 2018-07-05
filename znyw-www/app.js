var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ServerConf=require("./ServerConf");


//--cookie管理系统。
var CookieMgrSYSTEM=require("./util/CookieMgrSystem");


var index = require('./routes/index');
var user = require('./routes/Intelligent');
// var user = require('./routes/user');

var app = express();

var partials = require('express-partials');
app.use(partials());

//--设定session
var session = require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {},
    secret: 'node_server_un'
}));

process.env.PORT=ServerConf.ServicePort;//设置端口号，不要占用了。
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({

    resave: false,
    saveUninitialized: true,
    cookie: {},
    secret: 'node_server_un'
    //store: new mongoStore({
    //  db: dbOptions.dbName,
    //  url: dbOptions.url
    //})
}));

app.use(require('express-domain-middleware'));

app.use('/', index);
app.use('/user', user);
// app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("Not Found 404");
    var err = new Error('Not Found');
    err.status = 404;
    res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log("500");
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
CookieMgrSYSTEM.init({
    siteSessionKeys:ServerConf.siteSessionKeys
});
CookieMgrSYSTEM.runScheduleTask();

module.exports = app;
