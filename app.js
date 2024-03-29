const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://karthiksriramoju11:39S5cn7Zr89H58Tc@cluster0.lsrd0d3.mongodb.net/test";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true ,autoIndex:true})
.then(() => console.log('Connected to MongoDB'))
.then(result => app.listen(3000))
.catch(err => console.error('Error connecting to MongoDB:', err));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Login route
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// After successful login, redirect to the blogs page
app.post('/login', (req, res) => {
  // Check login credentials
  // If credentials are correct, redirect to blogs page
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});