var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// LDAPLDAPLDAPLDAPLDAPLDAPLDAP
var ldap = require('ldapjs');
var username = 'dmitry.vorobyev'; //req.body.username;
var password = 'Inferno88'; //req.body.password;
var ldapres = null;
var client = ldap.createClient({
	url: 'ldap://10.99.89.2:389'
});
var dn = null;

var opts = {
  searchFilter: '(mail=dmitry.vorobyev)',
  scope: 'sub',
};

 // To find user's Domain Components & Domain Names
/* 	client.search('DC=Megafon,DC=ru', opts, function(err, res) {

	  res.on('searchEntry', function(entry) {
		console.log('searchEntry ' + JSON.stringify(entry.object.dn));
		//dn = entry.object.dn;
	  });
	  res.on('searchReference', function(referral) {
		console.log('referral: ' + referral.uris.join());
	  });
	  res.on('error', function(err) {
		console.error('error: ' + err.message);
	  });
	  res.on('end', function(result) {
		console.log('status: ' + result.status);
	  });
	}); */
 //

/* var client = ldap.createClient({
	url: 'ldap://10.99.89.2:389',
	bindDN: 'CN=msk-ldapreq,OU=Service Accounts,OU=MSK,DC=Megafon,DC=ru',
	bindCredentials: 'Sonic2013',
	searchBase: 'DC=Megafon,DC=ru',
	searchFilter: '(username=dmitry.vorobyev)'
});
  
client.search('DC=Megafon,DC=ru', opts, function (err, result) {
  console.log('1');
  result.on('searchEntry', function (entry) {
    ldapres = entry.raw
  })

  result.on('end', function (result) {
    if (!ldapres) { console.log('2'); }

	console.log(ldapres);

  })
}) */
 
// LDAPLDAPLDAPLDAPLDAPLDAPLDAP

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// установить кодировку в заголовки http страниц
app.use(function(req, res, next) {
  res.setHeader('charset', 'utf-8')
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
console.log(req.body.user_name);
  res.render('auth', {
	title: '112'
  });
  
});

app.post('/login', function (req, res) {
 // Check user's credential
	client.bind(req.body.user_name, req.body.user_pass, function(err) {
	  if (err) {
		console.log('error: ' + err);
	  }
	  else {
		console.log('successful');
		res.render('main');
	  }
	});
 //
  
});


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

 
app.listen(3000, function () {
  
});




module.exports = app;
