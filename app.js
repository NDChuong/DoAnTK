var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');

// ================ ROUTER DECLARATION ================
var indexRouter = require('./routes/index');
var accountSettingsRouter = require('./routes/account-settings');
var bookDetailRouter = require('./routes/book-detail');
var bookshelfDetailRouter = require('./routes/bookshelf-detail');
var historyRouter = require('./routes/history');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var searchRouter = require('./routes/search');
// ================ ROUTER DECLARATION ================

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'Do an 10 diem nhe'
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/')));

// =============== ROUTING ===================
app.use('/', indexRouter);
app.use('/account-settings.html', accountSettingsRouter);
app.use('/book-detail.html', bookDetailRouter);
app.use('/bookshelf-detail.html', bookshelfDetailRouter);
app.use('/history.html', historyRouter);
app.use('/login.html', loginRouter);
app.use('/logout.html', logoutRouter);
app.use('/search.html', searchRouter);
// =============== ROUTING ===================

// ================== DEBUGGING business.js ===================
// const businessRouter = require('./controller/business');
// app.use('/business', businessRouter);
// ================== DEBUGGING business.js ===================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
