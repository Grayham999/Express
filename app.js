// app.js

const express = require('express');
const app = express();
const path = require('path');

// Middleware to check working hours
function workingHoursMiddleware(req, res, next) {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  // Check if the request is within working hours (Monday to Friday, 9 to 17)
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
}

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply the working hours middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
